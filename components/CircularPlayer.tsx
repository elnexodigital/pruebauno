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
  const spinClass = isPlaying && isMusic ? 'animate-spin-slow' : '';
  
  return (
    <div className={`flex flex-col items-center gap-2 transition-transform duration-500 ${animationClass}`}>
      
      {/* The main circular button */}
      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        className="relative w-28 h-28 md:w-36 md:h-36 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-full"
      >
        {/* SVG for curved text */}
        <svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute top-0 left-0 transition-transform duration-700 ease-in-out group-hover:rotate-180"
        >
            <defs>
            <path
                id="player-text-arc"
                d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
            </defs>
            <text
                className="font-display text-[9px] md:text-[11px] text-white tracking-[0.15em] opacity-70"
                fill="currentColor"
            >
            <textPath href="#player-text-arc" startOffset="75%" textAnchor="middle">
                COMPAÑÍA
            </textPath>
            </text>
        </svg>

        {/* The image in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform duration-300 pointer-events-none overflow-hidden">
            <img
                src={isMusic ? NEXO_DIGITAL_LOGO_URL : item.coverUrl}
                alt={isMusic ? "El Nexo Digital Logo" : (item.title || 'Carátula')}
                className={`w-full h-full object-cover ${spinClass} ${isMusic ? 'p-2' : ''}`}
            />
        </div>

        {/* Play/Pause icon overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <div
              className="text-white"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
        </div>
      </button>

      {/* Title/Artist below */}
      <div className="text-center w-28 md:w-36 h-12 flex flex-col justify-center items-center mt-1">
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