import React, { useState } from 'react';
import { UserInfo } from '../types';
import BackgroundImage from './BackgroundVideo';

interface WelcomeFormProps {
  onSave: (user: UserInfo) => void;
  imageUrl: string;
  overlayClass: string;
}

const WelcomeForm: React.FC<WelcomeFormProps> = ({ onSave, imageUrl, overlayClass }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Por favor, dime tu nombre.');
      return;
    }
    setError('');
    onSave({ name: trimmedName });
  };

  return (
    <div 
      className="relative w-screen h-screen flex flex-col items-center justify-center transition-all duration-1000 p-4"
    >
      <BackgroundImage imageUrl={imageUrl} overlayClass={overlayClass} />
      <div className="relative w-full max-w-md text-center p-8 bg-black bg-opacity-30 rounded-2xl shadow-2xl backdrop-blur-lg z-10">
        <h1 className="font-brittany text-3xl md:text-4xl font-normal text-white mb-2 tracking-wide">El Nexo Digital</h1>
        <p className="text-base text-gray-200 mb-8">¡Hola! Por única vez, decime tu nombre así sé a quién dirigirme.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-white/10 border-white/20 text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tu primer nombre"
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full mt-4 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Guardar y Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeForm;