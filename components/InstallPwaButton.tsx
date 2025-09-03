import React from 'react';
import InstallIcon from './icons/InstallIcon';

interface InstallPwaButtonProps {
    onClick: () => void;
}

const InstallPwaButton: React.FC<InstallPwaButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600/60 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-indigo-600/80 transition-all duration-300 shadow-lg"
            aria-label="Instalar la aplicación"
        >
            <InstallIcon />
            <span>Instalar App</span>
        </button>
    );
};

export default InstallPwaButton;
