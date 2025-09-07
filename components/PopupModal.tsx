import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from './icons/CloseIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import { PopupContent, NewsItem } from '../types';
import WeatherIcon from './WeatherIcon';

interface PopupModalProps {
  content: PopupContent | null;
  onClose: () => void;
  audioContext: AudioContext | null;
  audioDestination: AudioNode | null;
  selectedVoiceId?: string;
  elevenLabsApiKey?: string;
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


const PopupModal: React.FC<PopupModalProps> = ({ content, onClose, audioContext, audioDestination, selectedVoiceId, elevenLabsApiKey }) => {
  type AudioStatus = 'idle' | 'generating' | 'playing' | 'error-key' | 'error-generic' | 'finished';

  const [audioStatus, setAudioStatus] = useState<AudioStatus>('idle');
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const onCloseRef = useRef(onClose);
  
  const isNewsLoaded = content?.type === 'news' && Array.isArray(content.text);
  
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isNewsLoaded || !content || !audioContext || !audioDestination) {
      return;
    }

    if (!elevenLabsApiKey) {
      console.error("ElevenLabs API key not found in settings. Please configure it in the settings modal.");
      setAudioStatus('error-key');
      return;
    }
    
    // The user has specified "Grace" as the voice. Her Voice ID is oWAxZDx7w5z9X6Rzeh3p.
    const defaultVoiceId = 'oWAxZDx7w5z9X6Rzeh3p'; 
    const voiceIdToUse = selectedVoiceId || defaultVoiceId;

    let textToSpeak = '';
    if (content.weather) {
      textToSpeak += `El pronóstico para Juan Lacaze: ${content.weather.temperature} grados, cielo ${content.weather.description}, con vientos de ${content.weather.windSpeed}. `;
    }
    if (Array.isArray(content.text)) {
      const newsText = content.text
        .map(newsItem => `${newsItem.headline}. ${newsItem.summary}`)
        .join(' ... Siguiente noticia... ');
      textToSpeak += `Ahora, en El Nexo Digital, las noticias del día. ${newsText}`;
    }

    const abortController = new AbortController();

    const generateAndPlayAudio = async () => {
      setAudioStatus('generating');
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceIdToUse}/stream`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey,
          },
          body: JSON.stringify({
            text: textToSpeak,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
           const errorBody = await response.json();
           let errorMessage = `ElevenLabs API request failed with status ${response.status}`;
           if (errorBody && errorBody.detail && errorBody.detail.message) {
               errorMessage += `: ${errorBody.detail.message}`;
           }
           if (response.status === 401) {
               console.error("ElevenLabs Error: Invalid API Key.", errorBody);
               throw new Error("Invalid API Key");
           }
           console.error("ElevenLabs API Error:", errorBody);
           throw new Error(errorMessage);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audioPlayer = new Audio(audioUrl);
        audioPlayer.crossOrigin = "anonymous";
        audioPlayerRef.current = audioPlayer;

        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        const source = audioContext.createMediaElementSource(audioPlayer);
        sourceNodeRef.current = source;
        source.connect(audioDestination);
        
        audioPlayer.play();
        setAudioStatus('playing');

        audioPlayer.onended = () => {
          setAudioStatus('finished');
          setTimeout(() => onCloseRef.current(), 1500);
        };
        audioPlayer.onerror = () => {
          console.error("Error playing ElevenLabs audio.");
          setAudioStatus('error-generic');
        }

      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error("Error generating or playing ElevenLabs audio:", error);
           if ((error as Error).message.includes("Invalid API Key")) {
              setAudioStatus('error-key');
          } else {
              setAudioStatus('error-generic');
          }
        }
      }
    };
    
    const speakTimeout = setTimeout(generateAndPlayAudio, 500);

    return () => {
      clearTimeout(speakTimeout);
      abortController.abort();
      const audioPlayer = audioPlayerRef.current;
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = '';
      }
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.disconnect();
        } catch(e) { /* Ignore */ }
        sourceNodeRef.current = null;
      }
      setAudioStatus('idle');
    };
  }, [isNewsLoaded, content, audioContext, audioDestination, selectedVoiceId, elevenLabsApiKey]);
  
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
        
        {isNewsLoaded && (
            <div className="px-6 md:px-8 pt-4 flex items-center justify-center text-sm text-gray-600 space-x-2">
                {audioStatus === 'generating' && (
                    <>
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Generando audio...</span>
                    </>
                )}
                {audioStatus === 'playing' && (
                    <>
                        <SpeakerIcon isSpeaking={true} />
                        <span>Reproduciendo noticias...</span>
                    </>
                )}
                {audioStatus === 'error-key' && (
                    <span className="text-red-500 font-semibold">Error: Revisa tu clave de API de ElevenLabs en la configuración.</span>
                )}
                {audioStatus === 'error-generic' && (
                    <span className="text-red-500 font-semibold">No se pudo generar el audio. Inténtalo más tarde.</span>
                )}
            </div>
        )}

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
