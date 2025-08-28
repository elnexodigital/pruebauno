import React, { useEffect, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import { PopupContent } from '../types';

interface PopupModalProps {
  content: PopupContent | null;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ content, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup previous audio if content changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (content?.audioUrl) {
      try {
        const audio = new Audio(content.audioUrl);
        audioRef.current = audio;
        audio.play().catch(e => console.error("Popup audio playback failed:", e));
      } catch (error) {
        console.error("Error creating popup audio:", error);
      }
    }

    // Cleanup function on unmount or content change
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [content]);

  if (!content) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl p-8 m-4 max-w-lg w-full animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{content.title}</h2>
        <p className="text-gray-600 mb-6">{content.text}</p>
        
        {content.videoUrl && (
          <div className="rounded-lg mb-6 overflow-hidden aspect-video bg-black">
            <video
              src={content.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              controls
              playsInline
            />
          </div>
        )}

        {content.imageUrl && !content.videoUrl && (
           <img src={content.imageUrl} alt={content.title} className="rounded-lg mb-6 w-full object-cover"/>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
