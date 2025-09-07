import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserInfo, AppSettings } from '../types';
import CloseIcon from './icons/CloseIcon';
import VoiceSelector from './VoiceSelector';

interface ConfigModalProps {
  onClose: () => void;
  userInfo: UserInfo | null;
  timeGreeting: string;
  // FIX: The `ai` prop can be null if the API key is not available.
  ai: GoogleGenAI | null;
  settings: AppSettings;
  onSettingsChange: (newSettings: Partial<AppSettings>) => void;
}

type ApiStatus = 'idle' | 'checking' | 'success' | 'error';

const Instructions: React.FC = () => (
    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 space-y-4">
        <p className="font-semibold">Cómo configurar tu API Key de ElevenLabs:</p>
        <ol className="list-decimal list-inside space-y-2">
            <li>
                <strong>Crea el archivo secreto:</strong> En la lista de archivos de tu proyecto (a la izquierda), busca el ícono para crear un archivo nuevo (suele ser una hoja con un '+').
            </li>
            <li>
                <strong>Nómbralo correctamente:</strong> Nombra el archivo <strong>exactamente</strong> como <code className="bg-gray-200 px-1 rounded">.env</code> y presiona Enter. ¡El punto al principio es crucial!
                <p className="text-xs text-gray-500 mt-1">
                    <strong>Tip:</strong> Si el editor insiste en agregar <code className="bg-gray-200 px-1 rounded">.tsx</code>, intenta nombrar el archivo entre comillas: <code className="bg-gray-200 px-1 rounded">".env"</code>. O crea un archivo llamado <code className="bg-gray-200 px-1 rounded">temp.txt</code>, luego haz clic derecho, selecciona "Renombrar" y cámbiale el nombre a <code className="bg-gray-200 px-1 rounded">.env</code>.
                </p>
            </li>
            <li>
                <strong>Pega tu clave:</strong> Abre el archivo <code className="bg-gray-200 px-1 rounded">.env</code> y pega la siguiente línea, reemplazando <code className="bg-gray-200 px-1 rounded">TU_CLAVE_AQUI</code> con tu clave real de ElevenLabs.
                 <pre className="bg-gray-200 text-gray-800 p-2 rounded mt-1 text-xs">
                    <code>VITE_ELEVENLABS_API_KEY=TU_CLAVE_AQUI</code>
                 </pre>
            </li>
            <li>
                <strong>Refresca la aplicación:</strong> Una vez guardado el archivo, recarga esta página.
            </li>
        </ol>
    </div>
);

const StatusIndicator: React.FC<{ status: ApiStatus; onShowInstructions: () => void; }> = ({ status, onShowInstructions }) => {
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
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>Conexión con la API de Gemini: Fallida</span>
        </div>
        <button
          onClick={onShowInstructions}
          className="text-sm text-indigo-600 hover:underline"
        >
          ¿No funciona? Toca aquí para ver las instrucciones.
        </button>
      </div>
    );
  }
  return null;
};

const ConfigModal: React.FC<ConfigModalProps> = ({ onClose, userInfo, timeGreeting, ai, settings, onSettingsChange }) => {
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiStatus>('idle');
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const verifyApiKey = async () => {
      // FIX: Handle the case where the AI client could not be initialized.
      if (!ai) {
        setApiKeyStatus('error');
        return;
      }
      setApiKeyStatus('checking');
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
                <StatusIndicator status={apiKeyStatus} onShowInstructions={() => setShowInstructions(true)} />
                {apiKeyStatus === 'error' && (
                  <p className="text-xs text-gray-500 mt-1">La clave de API (VITE_API_KEY) no se encontró o no es válida. Las funciones de IA están desactivadas.</p>
                )}
                {showInstructions && apiKeyStatus === 'error' && <Instructions />}
            </div>
            <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Notificaciones Sonoras</h3>
                <div className="flex items-center justify-between">
                    <label htmlFor="news-alert-toggle" className="text-gray-800 text-sm cursor-pointer">
                        Sonido de alerta para noticias
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
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Voz de las Noticias (ElevenLabs)</h3>
                <VoiceSelector settings={settings} onSettingsChange={onSettingsChange} />
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