import React from 'react';

interface OwnerControlsProps {
  onShowPopup: () => void;
}

const OwnerControls: React.FC<OwnerControlsProps> = ({ onShowPopup }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onShowPopup}
        className="px-4 py-2 bg-indigo-600/50 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-indigo-600/70 transition-colors duration-300 shadow-lg"
      >
        Admin: Mostrar Popup
      </button>
    </div>
  );
};

export default OwnerControls;