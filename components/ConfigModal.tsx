import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserInfo, AppSettings } from '../types';
import CloseIcon from './icons/CloseIcon';
import VoiceSelector from './VoiceSelector';

interface ConfigModalProps {
  onClose: () => void;
  userInfo: UserInfo | null;
  timeGreeting: string;
  ai: GoogleGenAI | null;
  settings: AppSettings;
  onSettingsChange: (newSettings: Partial<AppSettings>) => void;
}

type ApiStatus = 'idle' | 'checking' | 'success' | 'error';

const ApiStatusIndicator: React.FC<{ status: ApiStatus, serviceName: string }> = ({ status, serviceName }) => {
  if (status === 'checking') {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <span>Verificando conexión con {serviceName}...</span>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center space-x-2 text-sm text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Conexión con {serviceName}: Exitosa</span>
      </div>
    );
  }
    
  if (status === 'error') {
     return (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Conexión con {serviceName}: Fallida</span>
        </div>
     );
  }

  return <div className="text-sm text-gray-500">Estado de conexión desconocido.</div>;
};


const ConfigModal: React.FC<ConfigModalProps> = ({ onClose, userInfo, timeGreeting, ai, settings, onSettingsChange }) => {
  const [geminiApiStatus, setGeminiApiStatus] = useState<ApiStatus>('idle');
  const [elevenLabsApiStatus, setElevenLabsApiStatus] = useState<ApiStatus>('idle');
  const [elevenLabsApiKeyInput, setElevenLabsApiKeyInput] = useState(settings.elevenLabsApiKey || '');

  const verifyElevenLabsKey = async (key: string) => {
    if (!key) {
      setElevenLabsApiStatus('error');
      return;
    }
    setElevenLabsApiStatus('checking');
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': key },
      });
      if (!response.ok) throw new Error('Invalid key or API error');
      setElevenLabsApiStatus('success');
    } catch (error) {
      console.error("ElevenLabs API Key verification failed:", error);
      setElevenLabsApiStatus('error');
    }
  };

  useEffect(() => {
    const verifyGeminiKey = async () => {
      if (!ai) {
        setGeminiApiStatus('error');
        return;
      }
      setGeminiApiStatus('checking');
      try {
        await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: 'test' });
        setGeminiApiStatus('success');
      } catch (error) {
        setGeminiApiStatus('error');
      }
    };
    
    verifyGeminiKey();
    verifyElevenLabsKey(settings.elevenLabsApiKey || '');
  }, [ai, settings.elevenLabsApiKey]);

  const handleSaveKey = () => {
    onSettingsChange({ elevenLabsApiKey: elevenLabsApiKeyInput.trim() });
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h2>
        </div>

        <div className="flex-grow overflow-y-auto px-6 md:px-8 py-4 border-t border-b border-gray-200 space-y-6">
            
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Conexiones de API</h3>
                <div className="space-y-2">
                    <ApiStatusIndicator status={geminiApiStatus} serviceName="Gemini" />
                    <ApiStatusIndicator status={elevenLabsApiStatus} serviceName="ElevenLabs" />
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Voz de las Noticias (ElevenLabs)</h3>
                 <div>
                    <label htmlFor="elevenlabs-key" className="block text-sm font-medium text-gray-700">
                        Clave de API de ElevenLabs
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="password"
                            id="elevenlabs-key"
                            value={elevenLabsApiKeyInput}
                            onChange={(e) => setElevenLabsApiKeyInput(e.target.value)}
                            className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Pega tu clave de API aquí"
                        />
                        <button
                            onClick={handleSaveKey}
                            className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Guardar
                        </button>
                    </div>
                     {elevenLabsApiStatus === 'error' && <p className="mt-2 text-xs text-red-600">La clave no es válida o no se ha configurado.</p>}
                </div>
                {elevenLabsApiStatus === 'success' && (
                    <div className="mt-4">
                        <VoiceSelector 
                            settings={settings} 
                            onSettingsChange={onSettingsChange} 
                            elevenLabsApiKey={settings.elevenLabsApiKey} 
                        />
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Notificaciones Sonoras</h3>
                <div className="flex items-center justify-between">
                    <label htmlFor="news-alert-toggle" className="text-gray-800 text-sm cursor-pointer">
                        Reproducir sonido de alerta para noticias
                    </label>
                    <button
                        id="news-alert-toggle"
                        role="switch"
                        aria-checked={settings.playNewsAlert}
                        onClick={() => onSettingsChange({ playNewsAlert: !settings.playNewsAlert })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                            settings.playNewsAlert ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.playNewsAlert ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
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