import React from 'react';
import { VideoPodcast } from '../types';
import CloseIcon from './icons/CloseIcon';
import TypewriterText from './TypewriterText';

interface VideoPodcastModalProps {
  podcast: VideoPodcast | null;
  onClose: () => void;
}

const VideoPodcastModal: React.FC<VideoPodcastModalProps> = ({ podcast, onClose }) => {
  if (!podcast) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-2xl shadow-2xl m-4 w-full max-w-sm aspect-[9/16] animate-scale-up flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20"
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </button>
        
        {/* Video Player Area */}
        <div className="w-full aspect-square bg-gray-900">
            <video 
                key={podcast.id}
                src={podcast.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                loop
            />
        </div>

        {/* Transcript Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-black/50 flex flex-col justify-center">
            <TypewriterText 
                key={podcast.id} // Re-trigger animation when podcast changes
                text={podcast.transcript}
                speed={60}
                className="font-typewriter text-lg md:text-xl text-white/90"
            />
        </div>
      </div>
    </div>
  );
};

export default VideoPodcastModal;
