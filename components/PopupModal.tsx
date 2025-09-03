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
  const audioQueueRef = useRef<string[]>([]);
  const currentAudioIndexRef = useRef(0);
  const isCancelledRef = useRef(false);

  const isNewsLoaded = content?.type === 'news' && Array.isArray(content.text);
  
  // This effect will manage the entire audio lifecycle for the modal
  useEffect(() => {
    isCancelledRef.current = false;
    currentAudioIndexRef.current = 0;
    audioQueueRef.current = [];

    // Cleanup previous audio element if it exists
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    // Disconnect previous source node
    if(sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
    }

    if (!content) {
      return;
    }

    const audioPlayer = new Audio();
    audioPlayer.crossOrigin = "anonymous";
    audioPlayerRef.current = audioPlayer;

    const playNextChunk = () => {
      if (isCancelledRef.current || currentAudioIndexRef.current >= audioQueueRef.current.length) {
        return;
      }
      
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const nextSrc = audioQueueRef.current[currentAudioIndexRef.current];
      currentAudioIndexRef.current++;

      audioPlayer.src = nextSrc;
      audioPlayer.play().catch(error => {
        console.error(`Playback initiation failed for ${nextSrc}:`, error);
        setTimeout(playNextChunk, 250);
      });
    };

    const handleEnded = () => {
      setTimeout(playNextChunk, 500);
    };

    const handleError = () => {
      const error = audioPlayer.error;
      const src = audioPlayer.currentSrc;
      console.error(`TTS Audio Error on segment ${currentAudioIndexRef.current - 1}:`, {
          code: error?.code,
          message: error?.message,
          src: src
      });
      setTimeout(playNextChunk, 250);
    };

    audioPlayer.addEventListener('ended', handleEnded);
    audioPlayer.addEventListener('error', handleError);
    
    // Connect to the master audio context passed from App.tsx
    try {
      if (audioContext && audioDestination && !sourceNodeRef.current) {
        const source = audioContext.createMediaElementSource(audioPlayer);
        sourceNodeRef.current = source;
        
        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-30, audioContext.currentTime);
        compressor.knee.setValueAtTime(30, audioContext.currentTime);
        compressor.ratio.setValueAtTime(12, audioContext.currentTime);
        compressor.attack.setValueAtTime(0, audioContext.currentTime);
        compressor.release.setValueAtTime(0.25, audioContext.currentTime);
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 4.0; // Significant boost for TTS clarity

        // Connect source -> gain -> compressor -> master destination
        source.connect(gainNode).connect(compressor).connect(audioDestination);
      }
    } catch (e) {
      console.error("Failed to setup Web Audio for popup.", e);
    }

    if (isNewsLoaded) {
      const textsToSpeak = (content.text as NewsItem[])
        .flatMap(item => [item.headline, item.summary])
        .filter(text => text && text.trim() !== '');

      if (textsToSpeak.length > 0) {
        audioQueueRef.current = textsToSpeak.map(text => {
          const encodedText = encodeURIComponent(text.substring(0, 200));
          return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=es&client=tw-ob`;
        });
        playNextChunk();
      }
    } else if (content.audioUrl) {
      audioQueueRef.current = [content.audioUrl];
      playNextChunk();
    }

    return () => {
      isCancelledRef.current = true;
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = '';
        audioPlayer.removeEventListener('ended', handleEnded);
        audioPlayer.removeEventListener('error', handleError);
      }
      if(sourceNodeRef.current){
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
    };

  }, [content, isNewsLoaded, audioContext, audioDestination]);

  const handleModalClose = () => {
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