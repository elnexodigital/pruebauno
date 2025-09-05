import React from 'react';
import { VideoPodcast } from '../types';
import PlayIcon from './icons/PlayIcon';
import { NEXO_DIGITAL_LOGO_URL } from '../constants';

interface VideoPodcastCardProps {
  podcast: VideoPodcast;
  onClick: () => void;
}

const VideoPodcastCard: React.FC<VideoPodcastCardProps> = ({ podcast, onClick }) => {
  return (
    <button 
        onClick={onClick}
        className="flex flex-col items-center gap-2 group cursor-pointer"
        aria-label={`Reproducir videocast: ${podcast.title}`}
    >
       <div className="w-[120px] md:w-[160px] text-center mb-1">
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-[0.05em] md:tracking-[0.075em] opacity-70">VIDEOCAST</h2>
      </div>
      <div
        className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-2xl shadow-2xl overflow-hidden bg-gray-900/50"
      >
        <img 
          src={NEXO_DIGITAL_LOGO_URL}
          alt={podcast.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 p-2"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white rounded-full p-4 bg-white/10 backdrop-blur-sm">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="text-center w-[120px] md:w-[160px] h-12 flex flex-col justify-center items-center mt-1">
        <p className="text-sm font-bold text-white truncate w-full">{podcast.title}</p>
      </div>
    </button>
  );
};

export default VideoPodcastCard;