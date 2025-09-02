import React from 'react';
import SettingsIcon from './icons/SettingsIcon';

interface OwnerControlsProps {
  onShowPopup: () => void;
  onShowConfig: () => void;
  onTestVideoPodcast: () => void;
}

const OwnerControls: React.FC<OwnerControlsProps> = ({ onShowPopup, onShowConfig, onTestVideoPodcast }) => {
  return (
    <div className="flex items-center space-x-2">
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
      <button
        onClick={onShowConfig}
        className="px-4 py-2 bg-gray-600/50 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-gray-600/70 transition-colors duration-300 shadow-lg flex items-center space-x-2"
        aria-label="Abrir configuración del sistema"
      >
        <SettingsIcon />
        <span>Config</span>
      </button>
    </div>
  );
};

export default OwnerControls;