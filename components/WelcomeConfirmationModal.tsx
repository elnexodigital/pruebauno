import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface WelcomeConfirmationModalProps {
  onClose: () => void;
}

const WelcomeConfirmationModal: React.FC<WelcomeConfirmationModalProps> = ({ onClose }) => {

  const handleConfirm = () => {
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl m-4 max-w-sm w-full animate-scale-up flex flex-col text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">¡Bienvenido a El Nexo Digital!</h2>
          <p className="text-gray-600 mt-4">
            Ya estás listo para comenzar la experiencia.
          </p>
        </div>
        <div className="px-6 pb-6">
            <button
              onClick={handleConfirm}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Me Sumo
            </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeConfirmationModal;