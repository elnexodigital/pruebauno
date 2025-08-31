// Fix: Completed the file which was truncated, causing a missing export error.
import React, { useEffect, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import { PopupContent, NewsItem } from '../types';
import { NEWS_INTRO_URL, NEWS_OUTRO_URL } from '../constants';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const outroHasPlayed = useRef(false);
  
  const isNewsLoaded = content?.type === 'news' && Array.isArray(content.text);

  // Effect for sequenced news audio (intro -> TTS -> outro)
  useEffect(() => {
    if (!isNewsLoaded) return;

    // Reset state for this popup instance
    outroHasPlayed.current = false;
    window.speechSynthesis?.cancel();

    const introAudio = new Audio(NEWS_INTRO_URL);
    
    const playOutro = () => {
      if (!outroHasPlayed.current) {
        outroHasPlayed.current = true;
        const outroAudio = new Audio(NEWS_OUTRO_URL);
        outroAudio.play().catch(e => console.error("Outro audio playback failed", e));
      }
    };

    const textToSpeak = (content.text as NewsItem[])
      .map(item => `${item.headline}. ${item.summary}`)
      .join('\n');

    const startSpeechSynthesis = () => {
        if (!textToSpeak) return;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'es-UY';
        utterance.onend = playOutro;
        
        const voices = window.speechSynthesis.getVoices();
        const googleVoice = voices.find(v => v.lang.startsWith('es') && v.name.includes('Google'));
        const anySpanishVoice = voices.find(v => v.lang.startsWith('es'));
        
        if (googleVoice) {
            utterance.voice = googleVoice;
        } else if (anySpanishVoice) {
            utterance.voice = anySpanishVoice;
        }

        window.speechSynthesis.speak(utterance);
    };
      
    const handleIntroEnd = () => {
        // Voices might not be loaded yet. We check, and if not, we wait for the `voiceschanged` event.
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = startSpeechSynthesis;
        } else {
            startSpeechSynthesis();
        }
    };
    
    introAudio.onended = handleIntroEnd;

    introAudio.play().catch(e => {
      console.error("Intro audio playback failed, starting TTS directly.", e);
      handleIntroEnd(); // Fallback if intro fails
    });

    return () => {
      // Cleanup: stop all sounds and remove event listener
      introAudio.pause();
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };

  }, [content, isNewsLoaded]);

  // Effect for generic popup audio (non-news)
  useEffect(() => {
    if (content?.audioUrl) {
      const audio = new Audio(content.audioUrl);
      audioRef.current = audio;
      audio.play().catch(e => console.error("Popup audio playback failed:", e));
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [content?.audioUrl]);


  const handleModalClose = () => {
    window.speechSynthesis?.cancel(); // Always stop TTS on close
    
    if (isNewsLoaded && !outroHasPlayed.current) {
        outroHasPlayed.current = true; // prevent double play from onend event
        const outroAudio = new Audio(NEWS_OUTRO_URL);
        outroAudio.play().catch(e => console.error("Outro on close failed", e));
    }
    
    onClose();
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
              <div>
                <h2 className="font-brittany text-4xl text-gray-900 pr-16">El Nexo Digital</h2>
                <p className="text-sm text-gray-600 mt-1">una forma diferente de saber la noticia</p>
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 pr-8">{content.title}</h2>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4">
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
              <video src={content.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
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
