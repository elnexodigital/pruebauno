import React from 'react';

interface OwnerControlsProps {
  onShowPopup: () => void;
  onTestVideoPodcast: () => void;
}

const OwnerControls: React.FC<OwnerControlsProps> = ({ onShowPopup, onTestVideoPodcast }) => {
  return (
    <>
      <button
        onClick={onTestVideoPodcast}
        className="px-4 py-2 bg-purple-600/50 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-purple-600/70 transition-colors duration-300 shadow-lg"
      >
        Probar Videocast
      </button>
      <button
        onClick={onShowPopup}
        className="px-4 py-2 bg-indigo-600/50 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-indigo-600/70 transition-colors duration-300 shadow-lg"
      >
        Probar Noticias
      </button>
    </>
  );
};

export default OwnerControls;