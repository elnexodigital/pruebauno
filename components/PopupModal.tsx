import React, { useEffect, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import { PopupContent, NewsItem } from '../types';
import WeatherIcon from './WeatherIcon';

interface PopupModalProps {
  content: PopupContent | null;
  onClose: () => void;
  audioContext: AudioContext | null;
  audioDestination: AudioNode | null;
}

const GeminiIcon: React.FC = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24"
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


const PopupModal: React.FC<PopupModalProps> = ({ content, onClose, audioContext, audioDestination }) => {
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const onCloseRef = useRef(onClose);
  
  const isNewsLoaded = content?.type === 'news' && Array.isArray(content.text);
  
  useEffect(() => {
    // Keep the ref updated with the latest onClose function to avoid stale closures.
    onCloseRef.current = onClose;
  }, [onClose]);

  // Effect for Text-to-Speech (TTS) for news
  useEffect(() => {
    if (!isNewsLoaded || !content) {
      return;
    }

    // Ensure any previous speech is stopped before starting a new one.
    window.speechSynthesis.cancel();
    
    let textToSpeak = '';
    
    if (content.weather) {
      textToSpeak += `El pronóstico para Juan Lacaze: ${content.weather.temperature} grados, cielo ${content.weather.description}, con vientos de ${content.weather.windSpeed}. `;
    }

    if (Array.isArray(content.text)) {
      // Construct a natural-sounding news report without reading labels like "Titular".
      const newsText = content.text
        .map(newsItem => `${newsItem.headline}. ${newsItem.summary}`)
        .join(' Siguiente noticia... ');
      textToSpeak += `${content.title}. ${newsText}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-UY';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0; // Volume is set to maximum (1.0) for clarity.
    
    // Automatically close the modal after speech finishes. This is now more reliable.
    utterance.onend = () => {
      setTimeout(() => onCloseRef.current(), 1500); // Use ref to call the latest onClose.
    };

    // Delay speech to allow modal animations to complete.
    const speakTimeout = setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 500);

    // Cleanup function to run when the component unmounts or dependencies change.
    return () => {
      clearTimeout(speakTimeout);
      utterance.onend = null; // Prevent memory leaks.
      window.speechSynthesis.cancel(); // Stop any speech in progress.
    };
  }, [isNewsLoaded, content]); // `onClose` is removed from deps to prevent re-runs from parent component.
  
  useEffect(() => {
    let staticAudioCleanup = () => {};

    if (content?.audioUrl && audioContext && audioDestination) {
      const audioPlayer = new Audio();
      audioPlayer.crossOrigin = "anonymous";
      audioPlayer.src = content.audioUrl;
      audioPlayerRef.current = audioPlayer;

      try {
        const source = audioContext.createMediaElementSource(audioPlayer);
        sourceNodeRef.current = source;
        
        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-30, audioContext.currentTime);
        compressor.knee.setValueAtTime(30, audioContext.currentTime);
        compressor.ratio.setValueAtTime(12, audioContext.currentTime);
        compressor.attack.setValueAtTime(0, audioContext.currentTime);
        compressor.release.setValueAtTime(0.25, audioContext.currentTime);
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 4.0; 

        source.connect(gainNode).connect(compressor).connect(audioDestination);

        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        audioPlayer.play().catch(e => console.error("Static audio playback failed:", e));
      } catch (e) {
        console.error("Failed to setup Web Audio for popup:", e);
      }

      staticAudioCleanup = () => {
        if (audioPlayer) {
          audioPlayer.pause();
          audioPlayer.src = '';
        }
        if (sourceNodeRef.current) {
          try {
            sourceNodeRef.current.disconnect();
          } catch(e) {
             // Can error if already disconnected
          }
          sourceNodeRef.current = null;
        }
      };
    }
    
    return () => {
        staticAudioCleanup();
    };

  }, [content, audioContext, audioDestination]);

  const handleModalClose = () => {
    window.speechSynthesis.cancel();
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
              <div className="flex items-center justify-between w-full pr-12">
                <div>
                  <h2 className="font-brittany text-4xl text-gray-900">El Nexo Digital</h2>
                  <p className="text-sm text-gray-600 mt-1 font-bold">Una forma diferente de ver la noticia</p>
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
             <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">El clima en Juan Lacaze, Colonia, Uruguay</h4>
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
            <p className="text-xs text-gray-500 text-right mt-1">
              {new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4">
          {Array.isArray(content.text) ? (
            <div className="space-y-4">
              {content.text.map((item) => (
                <div key={item.headline}>
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