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
    <div className="flex flex-col items-center gap-2">
       <div className="w-[120px] md:w-[160px] text-center mb-1">
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-[0.05em] md:tracking-[0.075em] opacity-70">NEW PODCAST</h2>
      </div>
      <div
        className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-2xl shadow-2xl overflow-hidden group bg-gray-900/50"
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
      <div className="text-center w-[120px] md:w-[160px] h-12 flex flex-col justify-center items-center mt-1">
        <p className="text-sm font-bold text-white truncate w-full">{podcast.title}</p>
        {podcast.artist && <p className="text-xs text-gray-300 truncate w-full">{podcast.artist}</p>}
      </div>
    </div>
  );
};

export default SquarePlayer;