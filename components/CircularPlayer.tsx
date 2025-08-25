import React from 'react';
import { MediaItem } from '../types';
import LogoIcon from './icons/LogoIcon';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

interface CircularPlayerProps {
  item: MediaItem;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const CircularPlayer: React.FC<CircularPlayerProps> = ({ item, isPlaying, onTogglePlay }) => {
  const isMusic = item.type === 'music';

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full shadow-2xl overflow-hidden group bg-gray-900/50"
      >
        {isMusic ? (
           <LogoIcon className="w-full h-full p-8" />
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
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold text-white truncate max-w-[160px] md:max-w-[200px]">{isMusic ? "Música Aleatoria" : item.title}</h2>
        <p className="text-gray-300">Reproductor Principal</p>
      </div>
    </div>
  );
};

export default CircularPlayer;