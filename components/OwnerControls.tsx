import React from 'react';

interface OwnerControlsProps {
  onShowPopup: () => void;
}

const OwnerControls: React.FC<OwnerControlsProps> = ({ onShowPopup }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onShowPopup}
        className="px-4 py-2 bg-indigo-600/50 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-indigo-600/70 transition-colors duration-300 shadow-lg"
      >
        Probar Noticias
      </button>
    </div>
  );
};

export default OwnerControls;
