// Fix: Completed the file which was truncated, causing a missing export error.
import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import { PopupContent, NewsItem } from '../types';
import { NEWS_INTRO_URL, NEWS_OUTRO_URL } from '../constants';
import WeatherIcon from './WeatherIcon';

interface PopupModalProps {
  content: PopupContent | null;
  onClose: () => void;
}

const GeminiIcon: React.FC = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <path
            d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z"
            fill="currentColor"
        />
    </svg>
);


const PopupModal: React.FC<PopupModalProps> = ({ content, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const audioStateRef = useRef<'intro' | 'tts' | 'outro' | 'idle'>('idle');
  const [errorNoVoice, setErrorNoVoice] = useState<string | null>(null);

  const isNewsLoaded = content?.type === 'news' && Array.isArray(content.text);

  useEffect(() => {
    if (!content) return;

    let introAudio: HTMLAudioElement | null = null;
    let genericAudio: HTMLAudioElement | null = null;

    const cleanup = () => {
        window.speechSynthesis.cancel();
        if (introAudio) {
            introAudio.pause();
            introAudio.onended = null;
            introAudio.onerror = null;
            introAudio.src = '';
        }
        if (genericAudio) {
            genericAudio.pause();
            genericAudio.src = '';
        }
        audioStateRef.current = 'idle';
        window.speechSynthesis.onvoiceschanged = null;
    };

    if (isNewsLoaded) {
        const playOutroAndClose = () => {
            if (audioStateRef.current === 'outro') return;
            audioStateRef.current = 'outro';

            const outroAudio = new Audio(NEWS_OUTRO_URL);
            outroAudio.onended = onClose;
            outroAudio.onerror = onClose; // Close even if outro fails
            outroAudio.play().catch(onClose);
        };

        const startSpeech = () => {
            if (audioStateRef.current !== 'intro') return; // Ensure it follows the intro
            audioStateRef.current = 'tts';

            const textToSpeak = (content.text as NewsItem[])
                .map(item => `${item.headline}. ${item.summary}`)
                .join('. ');

            if (!textToSpeak) {
                playOutroAndClose();
                return;
            }

            const voices = window.speechSynthesis.getVoices();
            const voiceToUse = voices.find(v => v.lang.startsWith('es') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('es'));

            if (voiceToUse) {
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'es-UY';
                utterance.voice = voiceToUse;
                utterance.onend = playOutroAndClose;
                utterance.onerror = (e) => {
                    if (e.error !== 'interrupted') playOutroAndClose();
                };
                window.speechSynthesis.speak(utterance);
            } else {
                setErrorNoVoice("No encontré una voz en español en tu dispositivo para leer las noticias.");
                setTimeout(playOutroAndClose, 8000); // Wait and close
            }
        };

        const handleSpeechInit = () => {
            if (window.speechSynthesis.getVoices().length > 0) {
                startSpeech();
            } else {
                window.speechSynthesis.onvoiceschanged = startSpeech;
            }
        };

        audioStateRef.current = 'intro';
        introAudio = new Audio(NEWS_INTRO_URL);
        introAudio.onended = handleSpeechInit;
        introAudio.onerror = handleSpeechInit; // Try to speak even if intro fails
        introAudio.play().catch(handleSpeechInit);

    } else if (content.audioUrl) {
        genericAudio = new Audio(content.audioUrl);
        genericAudio.play().catch(e => console.error("Popup audio playback failed:", e));
    }

    return cleanup;

  }, [isNewsLoaded, content, onClose]);

  const handleModalClose = () => {
    if (isClosing) return;

    window.speechSynthesis.cancel();

    if (content?.type === 'news') {
        setIsClosing(true);
        const outroAudio = new Audio(NEWS_OUTRO_URL);
        outroAudio.onended = onClose;
        outroAudio.onerror = onClose;
        outroAudio.play().catch(onClose);
    } else {
        onClose();
    }
  };

  if (!content) return null;
  
  const hasSources = content.sources && content.sources.length > 0;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleModalClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl m-4 max-w-md w-full animate-scale-up flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 pb-0 flex-shrink-0">
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>
          
          {isNewsLoaded || content.type === 'news' ? (
            <>
              <div className="absolute top-6 right-14 w-8 h-8 text-indigo-400 z-10">
                <GeminiIcon />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="font-brittany text-4xl text-gray-900">El Nexo Digital</h2>
                  <p className="text-sm text-gray-600 mt-1">Una forma diferente de saber la noticia</p>
                </div>
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 pr-8">{content.title}</h2>
          )}
        </div>

        {/* Weather section */}
        {content.weather && (
          <div className="px-6 md:px-8 pt-4">
             <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between text-sm text-gray-700">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 text-gray-600">
                    <WeatherIcon description={content.weather.description} />
                 </div>
                 <span className="font-bold text-lg">{content.weather.temperature}°C</span>
               </div>
               <span className="capitalize">{content.weather.description}</span>
               <span>Viento: {content.weather.windSpeed}</span>
            </div>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4">
          {errorNoVoice && (
            <p className="text-red-600 font-bold text-center mb-4 p-2 bg-red-100 rounded-md">{errorNoVoice}</p>
          )}

          {Array.isArray(content.text) ? (
            <div className="space-y-4">
              {content.text.map((item, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.headline}</h3>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">{content.text}</p>
          )}

          {content.imageUrl && (
            <img src={content.imageUrl} alt={content.title} className="mt-4 rounded-lg w-full object-cover max-h-48" />
          )}
          {content.videoUrl && (
            <div className={`mt-4 w-full rounded-lg overflow-hidden bg-black aspect-[${content.videoAspectRatio || '16/9'}]`}>
              <video key={content.videoUrl} src={content.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        
        {/* Footer with sources */}
        {hasSources && (
          <div className="p-6 md:p-8 pt-4 flex-shrink-0 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fuentes de Gemini</h4>
            <ul className="space-y-1 text-sm max-h-24 overflow-y-auto">
              {content.sources?.map((source, index) => (
                <li key={index} className="truncate">
                  <a
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    title={source.web.title}
                  >
                    {source.web.title || source.web.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupModal;