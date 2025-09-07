import React, { useState, useEffect } from 'react';
import { AppSettings, ElevenLabsVoice } from '../types';

interface VoiceSelectorProps {
  settings: AppSettings;
  onSettingsChange: (newSettings: Partial<AppSettings>) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ settings, onSettingsChange }) => {
  const [voices, setVoices] = useState<ElevenLabsVoice[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const fetchVoices = async () => {
      const elevenlabsApiKey = (import.meta as any).env.VITE_ELEVENLABS_API_KEY;
      if (!elevenlabsApiKey) {
        setStatus('error');
        return;
      }
      try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: { 'xi-api-key': elevenlabsApiKey },
        });
        if (!response.ok) throw new Error('Failed to fetch voices');
        const data = await response.json();
        // Filter for usable voices, for example, pre-made ones.
        const usableVoices = data.voices.filter((v: any) => v.category === 'premade' && v.name !== 'Nicole');
        setVoices(usableVoices);
        setStatus('success');
      } catch (error) {
        console.error("Error fetching ElevenLabs voices:", error);
        setStatus('error');
      }
    };

    fetchVoices();
  }, []);

  if (status === 'loading') {
    return <div className="text-sm text-gray-500">Cargando voces...</div>;
  }

  if (status === 'error') {
    return <div className="text-sm text-red-500">No se pudieron cargar las voces. Verifica la clave de API de ElevenLabs.</div>;
  }

  return (
    <div className="flex items-center justify-between">
      <label htmlFor="voice-selector" className="text-gray-800 text-sm cursor-pointer">
        Voz de las Noticias
      </label>
      <select
        id="voice-selector"
        value={settings.selectedVoiceId || ''}
        onChange={(e) => onSettingsChange({ selectedVoiceId: e.target.value })}
        className="mt-1 block w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2"
      >
        <option value="">Predeterminada (Grace)</option>
        {voices.map(voice => (
          <option key={voice.voice_id} value={voice.voice_id}>{voice.name}</option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelector;
