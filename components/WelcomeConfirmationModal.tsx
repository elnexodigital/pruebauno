import React, { useState, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';

const ShareIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="inline-block align-middle mx-1"
    aria-hidden="true"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

interface WelcomeConfirmationModalProps {
  onClose: () => void;
  onInstall: () => void;
  installPromptEvent: any | null;
}

const WelcomeConfirmationModal: React.FC<WelcomeConfirmationModalProps> = ({ onClose, onInstall, installPromptEvent }) => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);
  }, []);
  
  const canInstall = !!installPromptEvent;

  const getInstructions = () => {
    if (isIOS) {
      return {
        title: "¡Bienvenido a El Nexo Digital!",
        mainText: "Disfruta de la experiencia completa.",
        tip: <>Para un acceso directo, instala la app en tu dispositivo. Toca el ícono de <strong>Compartir</strong> <ShareIcon /> y luego selecciona <strong>"Agregar a la pantalla de inicio"</strong>.</>
      };
    }
    if (canInstall) {
      return {
        title: "¡Instala la aplicación!",
        mainText: "Al hacer clic en 'Me Sumo', se te ofrecerá instalar la aplicación para un acceso directo y una mejor experiencia.",
        tip: "Esto agregará un ícono a tu pantalla de inicio para que puedas volver cuando quieras."
      };
    }
    return {
      title: "¡Bienvenido a El Nexo Digital!",
      mainText: "Ya estás listo para comenzar la experiencia.",
      tip: "Parece que ya tienes la aplicación instalada o tu navegador no es compatible con la instalación directa. ¡No hay problema, puedes seguir disfrutando desde aquí!"
    };
  };

  const { title, mainText, tip } = getInstructions();
  
  const handleConfirmClick = () => {
    // If an install prompt is available, trigger it.
    if (canInstall) {
      onInstall();
    }
    // Always close the modal afterwards.
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
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-4">
            {mainText}
          </p>
          <div className="text-gray-500 text-sm mt-4 p-3 bg-gray-100 rounded-lg text-left">
            <p className="font-semibold text-gray-700 mb-1">💡 Consejo:</p>
            {tip}
          </div>
        </div>
        <div className="px-6 pb-6">
            <button
              onClick={handleConfirmClick}
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