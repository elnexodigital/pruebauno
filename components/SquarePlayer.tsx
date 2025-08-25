import React from 'react';
import { Podcast } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

interface SquarePlayerProps {
  podcast: Podcast;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const SquarePlayer: React.FC<SquarePlayerProps> = ({ podcast, isPlaying, onTogglePlay }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl shadow-2xl overflow-hidden group bg-gray-900/50"
      >
        <img 
          src={podcast.coverUrl}
          alt={podcast.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onTogglePlay}
            className="text-white rounded-full p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? 'Detener' : 'Reproducir'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold text-white truncate max-w-[160px] md:max-w-[200px]">{podcast.title}</h2>
        <p className="text-gray-300">{podcast.artist || 'Último Podcast'}</p>
      </div>
    </div>
  );
};

export default SquarePlayer;