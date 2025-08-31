import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserInfo } from '../types';
import CloseIcon from './icons/CloseIcon';

interface ConfigModalProps {
  onClose: () => void;
  userInfo: UserInfo | null;
  timeGreeting: string;
  ai: GoogleGenAI | null;
}

type ApiStatus = 'idle' | 'checking' | 'success' | 'error';

const StatusIndicator: React.FC<{ status: ApiStatus }> = ({ status }) => {
  if (status === 'checking') {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <span>Verificando conexión con Gemini...</span>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Conexión con la API de Gemini: Exitosa</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <span>Conexión con la API de Gemini: Fallida</span>
      </div>
    );
  }
  return null;
};

const ConfigModal: React.FC<ConfigModalProps> = ({ onClose, userInfo, timeGreeting, ai }) => {
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiStatus>('idle');

  useEffect(() => {
    const verifyApiKey = async () => {
      setApiKeyStatus('checking');
      if (!ai) {
        setApiKeyStatus('error');
        return;
      }
      try {
        // A very lightweight call to check the API key
        await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: 'test',
        });
        setApiKeyStatus('success');
      } catch (error) {
        console.error("API Key verification failed:", error);
        setApiKeyStatus('error');
      }
    };
    verifyApiKey();
  }, [ai]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl m-4 max-w-md w-full animate-scale-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Estado del Sistema</h2>
        </div>

        <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4 border-t border-b border-gray-200 space-y-4">
            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Usuario</h3>
                <p className="text-gray-800">Hola, {userInfo?.name || 'Invitado'}.</p>
            </div>
             <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Sistema de Saludo</h3>
                <p className="text-gray-800">El saludo actual es: "{timeGreeting}".</p>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Conexión API</h3>
                <StatusIndicator status={apiKeyStatus} />
                {apiKeyStatus === 'error' && (
                    <p className="text-xs text-gray-500 mt-1">
                        Asegúrate de que la variable de entorno <code>VITE_API_KEY</code> esté configurada correctamente en Vercel.
                    </p>
                )}
            </div>
        </div>

        <div className="p-6 md:p-8 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Cerrar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
