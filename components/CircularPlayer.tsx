import React, { useState, useEffect, useRef } from 'react';
import { MediaItem } from '../types';
import { NEXO_DIGITAL_LOGO_URL } from '../constants';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

interface CircularPlayerProps {
  item: MediaItem;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const CircularPlayer: React.FC<CircularPlayerProps> = ({ item, isPlaying, onTogglePlay }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevItemIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevItemIdRef.current && prevItemIdRef.current !== item.videoId) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    prevItemIdRef.current = item.videoId;
  }, [item.videoId]);


  const isMusic = item.type === 'music';
  const animationClass = isAnimating ? 'animate-pulse-once' : '';
  const spinClass = isPlaying ? 'animate-spin-slow' : '';

  return (
    <div className={`flex flex-col items-center gap-2 transition-transform duration-500 ${animationClass}`}>
      <div className="w-[120px] md:w-[160px] text-center mb-1">
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-[0.1em] md:tracking-[0.15em] opacity-70">COMPAÑÍA</h2>
      </div>
      <div
        className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full shadow-2xl overflow-hidden group bg-gray-900/50"
      >
        {isMusic ? (
           <img
            src={NEXO_DIGITAL_LOGO_URL}
            alt="El Nexo Digital Logo"
            className={`w-full h-full object-cover ${spinClass}`}
           />
        ) : (
          <img 
            src={item.coverUrl}
            alt={item.title || 'Carátula'}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onTogglePlay}
            className="text-white rounded-full p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div className="text-center w-[120px] md:w-[160px] h-12 flex flex-col justify-center items-center mt-1">
        {item.type === 'podcast' && (
          <>
            <p className="text-sm font-bold text-white truncate w-full">{item.title || "Contenido Aleatorio"}</p>
            {item.artist && <p className="text-xs text-gray-300 truncate w-full">{item.artist}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default CircularPlayer;