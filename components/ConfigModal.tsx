
// FIX: Manually define the ImportMeta interface to provide types for 
// import.meta.env and resolve "'vite/client' not found" errors.
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_ELEVENLABS_API_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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
  elevenLabsApiKey?: string;
}

type ApiStatus = 'idle' | 'checking' | 'success' | 'error';

const ApiStatusIndicator: React.FC<{ status: ApiStatus, serviceName: string, isEnvVar: boolean }> = ({ status, serviceName, isEnvVar }) => {
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
     const helpText = isEnvVar 
        ? "Revisa las Variables de Entorno en tu hosting (ej. Vercel)."
        : "Revisa la clave en tu archivo local apiKeys.ts.";

     return (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Conexión con {serviceName}: Fallida. {helpText}</span>
        </div>
     );
  }

  return <div className="text-sm text-gray-500">Estado de conexión desconocido.</div>;
};


const ConfigModal: React.FC<ConfigModalProps> = ({ onClose, userInfo, timeGreeting, ai, settings, onSettingsChange, elevenLabsApiKey }) => {
  const [geminiApiStatus, setGeminiApiStatus] = useState<ApiStatus>('idle');
  const [elevenLabsApiStatus, setElevenLabsApiStatus] = useState<ApiStatus>('idle');
  
  const verifyElevenLabsKey = async (key?: string) => {
    if (!key || key.startsWith('PEGA_AQUÍ')) {
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
    verifyElevenLabsKey(elevenLabsApiKey);
  }, [ai, elevenLabsApiKey]);

  const isProduction = !!import.meta.env.VITE_GEMINI_API_KEY;

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
                    <ApiStatusIndicator status={geminiApiStatus} serviceName="Gemini" isEnvVar={isProduction} />
                    <ApiStatusIndicator status={elevenLabsApiStatus} serviceName="ElevenLabs" isEnvVar={isProduction} />
                </div>
                 <p className="text-xs text-gray-500">
                    <b>Para desarrollo local:</b> las claves se configuran en el archivo <code>apiKeys.ts</code> (ignorado por Git).<br/>
                    <b>Para producción (Vercel):</b> las claves DEBEN configurarse como <b>Variables de Entorno</b> en el panel de tu proyecto.
                </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Voz de las Noticias</h3>
                {elevenLabsApiStatus === 'success' ? (
                    <div className="mt-4">
                        <VoiceSelector 
                            settings={settings} 
                            onSettingsChange={onSettingsChange} 
                            elevenLabsApiKey={elevenLabsApiKey} 
                        />
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Configura una clave de ElevenLabs válida para seleccionar una voz.</p>
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

            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Instalar Aplicación (PWA)</h3>
                <p className="text-sm text-gray-600">
                    Si no ves el botón de instalación en la pantalla principal, puedes instalar la aplicación manually desde el menú de tu navegador (usualmente en los tres puntos "...") y buscando la opción <b>"Instalar El Nexo Digital"</b> o <b>"Agregar a la pantalla de inicio"</b>.
                </p>
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
