import React from 'react';
import InstallIcon from './icons/InstallIcon';

interface InstallPwaButtonProps {
    onClick: () => void;
}

const InstallPwaButton: React.FC<InstallPwaButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-5 right-5 z-[9999] flex animate-fade-in items-center gap-3 rounded-xl bg-gray-900/80 px-5 py-3 font-semibold text-white shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105"
            aria-label="Instalar la aplicación El Nexo Digital"
        >
            <InstallIcon />
            <span>Instalar El Nexo Digital</span>
        </button>
    );
};

export default InstallPwaButton;