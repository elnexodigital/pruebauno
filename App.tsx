// FIX: Removed unresolved Vite client types reference to fix "Cannot find type" error.
// The code now safely accesses `import.meta.env` via a type cast.

// FIX: Corrected the invalid React import and added missing hook imports (useState, useEffect, etc.) to resolve 'Cannot find name' errors.
// FIX: Corrected the React import to include missing hooks (useState, useEffect, useRef, useCallback, useMemo).
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { PODCASTS, MUSIC_TRACKS, VIDEO_URLS, GREETING_AUDIOS, AUDIO_STINGERS, POPUP_SCHEDULE, STATIC_BACKGROUND_URL, VIDEO_PODCASTS, NEWS_INTRO_URL, CHARACTER_IMAGES } from './constants';
import AudioPlayer from './components/AudioPlayer';
import VideoPlayer from './components/VideoPlayer';
import PopupModal from './components/PopupModal';
import WelcomeForm from './components/WelcomeForm';
import CircularPlayer from './components/CircularPlayer';
import BackgroundImage from './components/BackgroundVideo';
import TypewriterText from './components/TypewriterText';
import { TimeOfDay, UserInfo, MediaItem, Podcast, PopupContent, GroundingSource, NewsItem, WeatherInfo, VideoPodcast, AppSettings } from './types';
import OwnerControls from './components/OwnerControls';
import ConfigModal from './components/ConfigModal';
import InstallPwaButton from './components/InstallPwaButton';

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// FIX: Safely initialize the AI client to prevent crashes in non-Vite environments.
const getApiKey = (): string | undefined => {
  try {
    // This will throw if import.meta.env is undefined.
    // FIX: Cast `import.meta` to `any` to bypass TypeScript error when 'vite/client' types are not found.
    return (import.meta as any).env.VITE_API_KEY;
  } catch (e) {
    console.warn("Could not access import.meta.env. VITE_API_KEY is not available. AI features will be disabled.");
    return undefined;
  }
};

const apiKey = getApiKey();
const ai: GoogleGenAI | null = apiKey ? new GoogleGenAI({ apiKey }) : null;

const LOCAL_STORAGE_KEY = 'elNexoDigitalUserInfo';
const SETTINGS_KEY = 'elNexoDigitalSettings';

const fetchNews = async (): Promise<{ title: string; text: NewsItem[]; sources: GroundingSource[] } | null> => {
  if (!ai) {
    return {
        title: "Error de Configuración",
        text: [{ headline: "Clave de API no encontrada", summary: "La variable VITE_API_KEY no se encontró en este entorno. Las funciones de IA están deshabilitadas." }],
        sources: [],
    };
  }

  try {
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const prompt = `Genera un resumen de las 4 noticias más urgentes y de última hora a nivel mundial y de Uruguay para hoy, ${today}. Asegúrate de que la información sea lo más actualizada posible. Para cada noticia, da un titular conciso y un resumen muy breve de una oración. Usa este formato estricto para cada noticia, separándolas con un doble salto de línea (no agregues texto introductorio ni conclusiones):\nTITULAR: [el titular]\nRESUMEN: [el resumen]`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[] || [];
    const responseText = response.text.trim();
    
    if (responseText) {
      const newsBlocks = responseText.split('\n\n');
      const newsItems: NewsItem[] = newsBlocks.map(block => {
        const lines = block.split('\n').filter(line => line.trim() !== '');
        const headlineLine = lines.find(line => line.toUpperCase().startsWith('TITULAR:'));
        const summaryLine = lines.find(line => line.toUpperCase().startsWith('RESUMEN:'));
        
        if (headlineLine && summaryLine) {
          return {
            headline: headlineLine.substring(headlineLine.indexOf(':') + 1).trim(),
            summary: summaryLine.substring(summaryLine.indexOf(':') + 1).trim(),
          };
        }
        return null;
      }).filter((item): item is NewsItem => item !== null);
      
      if (newsItems.length > 0) {
        return {
          title: "Noticias del Día (con tecnología Gemini)",
          text: newsItems,
          sources: sources,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching or parsing news from Gemini:", error);
    return {
        title: "Error de Conexión",
        text: [{ headline: "Fallo en la comunicación", summary: "No pudimos obtener las noticias en este momento. La conexión con el nexo digital parece estar interrumpida. Por favor, inténtalo más tarde." }],
        sources: [],
    };
  }
};

const fetchWeather = async (): Promise<WeatherInfo | null> => {
  if (!ai) {
    console.warn("AI client not initialized, cannot fetch weather.");
    return null;
  }
  try {
    const prompt = "Cuál es el pronóstico del tiempo actual para la ciudad de Juan Lacaze, departamento de Colonia, Uruguay? Dame la temperatura actual en grados Celsius, una descripción muy breve del cielo (ej. 'Soleado', 'Parcialmente Nublado'), y la velocidad del viento en km/h.";
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            temperature: { type: Type.STRING },
            description: { type: Type.STRING },
            windSpeed: { type: Type.STRING },
          },
          required: ["temperature", "description", "windSpeed"],
        },
      },
    });

    const weatherData = JSON.parse(response.text);
    return weatherData as WeatherInfo;

  } catch (error) {
    console.error("Error fetching or parsing weather from Gemini:", error);
    return null;
  }
};

export default function App(): React.ReactNode {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  
  const { timeOfDay, overlayClass } = useTimeOfDay();

  const [mainPlayerItem, setMainPlayerItem] = useState<MediaItem | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(() => getRandomItem(VIDEO_URLS));
  const [activePlayer, setActivePlayer] = useState<'main' | null>(null);
  const [currentAudioId, setCurrentAudioId] = useState<string>('');
  const [lastPodcastPlayTime, setLastPodcastPlayTime] = useState<number | null>(null);
  const [mainPlayerVolume, setMainPlayerVolume] = useState<number>(1.0);
  
  const [activePopup, setActivePopup] = useState<PopupContent | null>(null);
  const [shownPopups, setShownPopups] = useState<string[]>([]);
  const [isDuckedForPopup, setIsDuckedForPopup] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [immersiveVideoPodcast, setImmersiveVideoPodcast] = useState<VideoPodcast | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(null);
  const [settings, setSettings] = useState<AppSettings>({ playNewsAlert: true });

  const isPlaying = activePlayer !== null;
  const isMainPlayerActive = activePlayer === 'main';
  
  const stingerTimeoutRef = useRef<number | null>(null);
  const masterAudioContextRef = useRef<AudioContext | null>(null);
  const masterAudioDestinationRef = useRef<AudioNode | null>(null);
  
  const shuffleMedia = useCallback((options: { forceMusic?: boolean } = {}) => {
    // If an immersive video is playing, don't shuffle anything new.
    if (immersiveVideoPodcast) return;

    const { forceMusic = false } = options;
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;

    // Decide what to play next. Give video podcasts a ~20% chance if not forced to music.
    const canPlayVideoPodcast = VIDEO_PODCASTS.length > 0 && !forceMusic;
    const shouldPlayVideoPodcast = canPlayVideoPodcast && Math.random() < 0.2;

    if (shouldPlayVideoPodcast) {
      const videoPodcast = getRandomItem(VIDEO_PODCASTS);
      setImmersiveVideoPodcast(videoPodcast);
      setActivePlayer(null); // Stop any other audio
      setMainPlayerItem(null);
      return;
    }

    const isTimeForPodcast = !lastPodcastPlayTime || (now - lastPodcastPlayTime > thirtyMinutes);
    const shouldPlayPodcast = !forceMusic && isTimeForPodcast && Math.random() > 0.5;
    
    let newItem: MediaItem;

    if (shouldPlayPodcast) {
        const podcast = getRandomItem(PODCASTS);
        newItem = {
            type: 'podcast',
            videoId: podcast.videoId,
            coverUrl: podcast.coverUrl,
            title: podcast.title,
            artist: podcast.artist,
        };
        setLastPodcastPlayTime(now);
    } else {
        const track = getRandomItem(MUSIC_TRACKS);
        const descriptionParts = track.description.split(':');
        const potentialTitle = descriptionParts[0];
        const title = (potentialTitle && potentialTitle.length < 60) ? potentialTitle : "Música";

        newItem = {
            type: 'music',
            videoId: track.url,
            coverUrl: 'logo',
            title: title.trim(),
            description: track.description,
        };
    }

    setMainPlayerItem(newItem);
    setActivePlayer('main');
    setCurrentAudioId(newItem.videoId);
  }, [lastPodcastPlayTime, immersiveVideoPodcast]);
  
  const handleVibeChange = useCallback(() => {
    shuffleMedia();
  }, [shuffleMedia]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        // DO NOT set isStarted here. Wait for user interaction.
        if (parsedUser.name && parsedUser.name.trim().toLowerCase() === 'leo castrillo') {
            setIsOwner(true);
        }
      }
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        setSettings(prev => ({ ...prev, ...JSON.parse(storedSettings) }));
      }
    } catch (error) {
      console.error("Failed to parse user info or settings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isStarted && !mainPlayerItem && !immersiveVideoPodcast) {
      shuffleMedia({ forceMusic: true });
    }
  }, [isStarted, mainPlayerItem, immersiveVideoPodcast, shuffleMedia]);
  
  // Effect to handle the PWA installation prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Only show the prompt if the app is not already installed
       if (!window.matchMedia('(display-mode: standalone)').matches && !(window.navigator as any).standalone) {
         setInstallPromptEvent(e);
       }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    const handleAppInstalled = () => {
      // Clear the prompt event once the app is installed
      setInstallPromptEvent(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);


  // Effect for handling audio stingers with auto-ducking
  useEffect(() => {
    let isCancelled = false;

    const scheduleTimeout = () => {
      if (stingerTimeoutRef.current) {
        clearTimeout(stingerTimeoutRef.current);
      }
      // Random time between 1 minute (60,000ms) and 3 minutes (180,000ms)
      const minDelay = 1 * 60 * 1000;
      const maxDelay = 3 * 60 * 1000;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      stingerTimeoutRef.current = window.setTimeout(playStingerAndScheduleNext, randomDelay);
    };

    const playStingerAndScheduleNext = () => {
      const randomStingerUrl = getRandomItem(AUDIO_STINGERS);
      const context = masterAudioContextRef.current;
      const destination = masterAudioDestinationRef.current;

      if (!context || !destination) {
        console.error("Master audio context not available for stinger playback.");
        if (!isCancelled) scheduleTimeout();
        return;
      }

      setMainPlayerVolume(0.1); // Duck main audio

      fetch(randomStingerUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.arrayBuffer();
        })
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          if (isCancelled) return;

          if (context.state === 'suspended') {
            context.resume();
          }
          
          const source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.onended = () => {
            if (isCancelled) return;
            setMainPlayerVolume(1.0); // Restore main audio volume
            scheduleTimeout();
          };
          
          // Re-create the same audio processing chain for quality
          const compressor = context.createDynamicsCompressor();
          compressor.threshold.setValueAtTime(-40, context.currentTime);
          compressor.knee.setValueAtTime(30, context.currentTime);
          compressor.ratio.setValueAtTime(12, context.currentTime);
          compressor.attack.setValueAtTime(0, context.currentTime);
          compressor.release.setValueAtTime(0.25, context.currentTime);
          
          const gainNode = context.createGain();
          gainNode.gain.value = 3.5; // 350% volume boost for presence

          // Chain: source -> gain -> compressor -> master chain destination
          source.connect(gainNode).connect(compressor).connect(destination);
          
          source.start();
        })
        .catch(error => {
          console.error("Audio stinger playback error:", error);
          if (isCancelled) return;
          setMainPlayerVolume(1.0); // Restore volume on error too
          scheduleTimeout();
        });
    };
    
    // Conditions to run the stinger logic
    if (!isMainPlayerActive || mainPlayerItem?.type !== 'music' || AUDIO_STINGERS.length === 0) {
      if (stingerTimeoutRef.current) clearTimeout(stingerTimeoutRef.current);
      return;
    }

    scheduleTimeout();

    // Cleanup function
    return () => {
      isCancelled = true;
      if (stingerTimeoutRef.current) {
        clearTimeout(stingerTimeoutRef.current);
      }
      setMainPlayerVolume(1.0);
    };
  }, [isMainPlayerActive, mainPlayerItem]);

  const handleShowPopup = useCallback(async (content?: PopupContent) => {
    if (activePopup) return;

    let finalContent: PopupContent | null = content || null;

    if (!finalContent) { // Manual trigger for news
        finalContent = {
            type: 'news', time: '',
            title: "Generando Noticias...",
            text: "Un momento por favor, estamos conectando con el nexo para traerte las últimas novedades.",
            videoUrl: "https://res.cloudinary.com/ddmj6zevz/video/upload/v1756612883/Vienen_las_Noticias_ujmv2i.mp4",
            videoAspectRatio: '1080/330',
        };
    }

    if (finalContent.type === 'news' && settings.playNewsAlert) {
      try {
        const alertAudio = new Audio(NEWS_INTRO_URL);
        alertAudio.play().catch(e => console.error("News alert audio failed to play:", e));
      } catch (e) {
        console.error("Error creating news alert audio:", e);
      }
    }

    setActivePopup(finalContent);

    if (finalContent.type === 'news') {
        const [newsContent, weatherContent] = await Promise.all([fetchNews(), fetchWeather()]);
        
        if (newsContent) {
            setActivePopup(prev => prev ? {
                ...prev,
                title: newsContent.title,
                text: newsContent.text,
                sources: newsContent.sources,
                weather: weatherContent ?? undefined,
            } : null);
        } else {
            setActivePopup(prev => prev ? {
                ...prev,
                title: 'Error de Conexión',
                text: 'No se pudieron obtener las noticias. Por favor, inténtalo más tarde.'
            } : null);
        }
    }
    
    if (finalContent.audioUrl || finalContent.videoUrl || finalContent.type === 'news') {
      if (activePlayer) {
        setIsDuckedForPopup(true);
      }
    }
  }, [activePlayer, activePopup, settings.playNewsAlert]);

  useEffect(() => {
    if (!isStarted) return;

    const checkTime = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const scheduledPopup = POPUP_SCHEDULE.find(p => p.time === currentTime);

      if (scheduledPopup && !shownPopups.includes(scheduledPopup.time)) {
          handleShowPopup(scheduledPopup);
          setShownPopups(prev => [...prev, scheduledPopup.time]);
      }
    };

    const intervalId = setInterval(checkTime, 30000); // Check every 30 seconds

    const now = new Date();
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5, 0).getTime() - now.getTime();
    const midnightTimer = setTimeout(() => {
        setShownPopups([]);
    }, msUntilMidnight);

    return () => {
      clearInterval(intervalId);
      clearTimeout(midnightTimer);
    };
  }, [isStarted, shownPopups, handleShowPopup]);

  const handleClosePopup = () => {
    setIsDuckedForPopup(false);
    setActivePopup(null);
  };
  
  const handleUserSaved = (user: UserInfo) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    setUserInfo(user);
    if (user.name && user.name.trim().toLowerCase() === 'leo castrillo') {
        setIsOwner(true);
    }
  };

  const handleSettingsChange = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updatedSettings = { ...prev, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };
  
  const handleInstallApp = async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setInstallPromptEvent(null);
  };

  const initAudioContext = () => {
    if (masterAudioContextRef.current) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        console.warn("Web Audio API is not supported.");
        return;
      }
      const context = new AudioContext();

      const masterCompressor = context.createDynamicsCompressor();
      masterCompressor.threshold.setValueAtTime(-20, context.currentTime);
      masterCompressor.knee.setValueAtTime(30, context.currentTime);
      masterCompressor.ratio.setValueAtTime(12, context.currentTime);
      masterCompressor.attack.setValueAtTime(0.003, context.currentTime);
      masterCompressor.release.setValueAtTime(0.25, context.currentTime);

      const masterGain = context.createGain();
      masterGain.gain.setValueAtTime(1.1, context.currentTime); // 10% overall boost

      masterCompressor.connect(masterGain).connect(context.destination);

      masterAudioContextRef.current = context;
      masterAudioDestinationRef.current = masterCompressor; // Other nodes connect here
    } catch (e) {
      console.error("Failed to create Master AudioContext.", e);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    
    initAudioContext();
    if (masterAudioContextRef.current && masterAudioContextRef.current.state === 'suspended') {
      masterAudioContextRef.current.resume();
    }

    setTimeout(() => {
      let greetingUrls: string[] = [];
      switch (timeOfDay) {
        case TimeOfDay.Morning: greetingUrls = GREETING_AUDIOS.morning; break;
        case TimeOfDay.Afternoon: greetingUrls = GREETING_AUDIOS.afternoon; break;
        case TimeOfDay.Night: greetingUrls = GREETING_AUDIOS.night; break;
        case TimeOfDay.Noctambulo: greetingUrls = GREETING_AUDIOS.noctambulo; break;
      }
      
      if (greetingUrls.length > 0) {
        const randomGreetingUrl = getRandomItem(greetingUrls);
        try {
           const audioContext = masterAudioContextRef.current;
           const destination = masterAudioDestinationRef.current;
           if (audioContext && destination) {
             fetch(randomGreetingUrl)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(destination); // Connect to master chain
                    source.start();
                })
                .catch(error => console.error("Greeting audio playback failed via Web Audio API:", error));
           } else {
             const greetingAudio = new Audio(randomGreetingUrl);
             greetingAudio.play().catch(error => console.error("Greeting audio autoplay failed (fallback):", error));
           }
        } catch (error) {
          console.error("Error creating or playing greeting audio:", error);
        }
      }
    }, 500);
  };
  
  const handleChangeUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserInfo(null);
    setIsOwner(false);
    setIsStarted(false);
  };
  
  const timeGreeting = useMemo(() => {
    switch (timeOfDay) {
      case TimeOfDay.Morning: return 'Buenos Días';
      case TimeOfDay.Afternoon: return 'Buenas Tardes';
      case TimeOfDay.Night: return 'Buenas Noches';
      case TimeOfDay.Noctambulo: return 'Buenas Noches';
      default: return 'Hola';
    }
  }, [timeOfDay]);

  const showInfoText = useMemo(() => {
    switch (timeOfDay) {
      case TimeOfDay.Morning: return '"Ojo Crítico" conduce Graciela Aquelarre';
      case TimeOfDay.Afternoon: return '"desintoxicación sonora" conduce Sergio Será';
      case TimeOfDay.Night:
      case TimeOfDay.Noctambulo:
        return '"Reflexiones de un noctámbulo" conduce Gabriel Callum';
      default: return '';
    }
  }, [timeOfDay]);

  const handleMainPlayerToggle = () => {
    if (isMainPlayerActive) {
      setActivePlayer(null);
      setCurrentAudioId('');
    } else if(mainPlayerItem) {
      setActivePlayer('main');
      setCurrentAudioId(mainPlayerItem.videoId);
    }
  };

  const handleAudioEnded = useCallback(() => {
    shuffleMedia();
  }, [shuffleMedia]);
  
  const handleAudioError = useCallback(() => {
    console.warn("Audio failed to load. Skipping to the next track.");
    handleAudioEnded();
  }, [handleAudioEnded]);

  const handleVideoEnded = useCallback(() => {
    setCurrentVideoUrl(prevUrl => {
      if (VIDEO_URLS.length <= 1) return prevUrl;
      let newUrl;
      do {
        newUrl = getRandomItem(VIDEO_URLS);
      } while (newUrl === prevUrl);
      return newUrl;
    });
  }, []);
  
  const handleVideoError = useCallback(() => {
    console.warn("Video failed to load. Skipping to the next video.");
    handleVideoEnded();
  }, [handleVideoEnded]);

  const handleImmersiveVideoEnded = useCallback(() => {
    setImmersiveVideoPodcast(null);
    setTimeout(() => {
      shuffleMedia({ forceMusic: true });
    }, 300);
  }, [shuffleMedia]);

  const handleTestVideoPodcast = () => {
    if (VIDEO_PODCASTS.length > 0) {
      const randomVP = getRandomItem(VIDEO_PODCASTS);
      setActivePlayer(null);
      setImmersiveVideoPodcast(randomVP);
    }
  };
  
  const handleUserConfirmation = async () => {
      if (installPromptEvent) {
        await handleInstallApp();
      }
      handleStart();
  };

  const stingerDuckedVolume = (isMainPlayerActive && mainPlayerItem?.type === 'music') ? mainPlayerVolume : 1.0;
  const audioPlayerVolume = isDuckedForPopup ? 0.1 : stingerDuckedVolume;

  if (!isStarted) {
    return (
      <WelcomeForm 
        onSave={handleUserSaved} 
        onConfirm={handleUserConfirmation}
        imageUrl={STATIC_BACKGROUND_URL} 
        overlayClass={overlayClass} 
      />
    );
  }
  
  if (immersiveVideoPodcast) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div 
          className="relative w-full max-w-sm aspect-[9/16] bg-black shadow-2xl rounded-lg flex flex-col overflow-hidden animate-scale-up"
        >
          <div className="w-full aspect-square bg-black">
            <VideoPlayer 
              videoUrl={immersiveVideoPodcast.videoUrl}
              loop={false}
              muted={false}
              onEnded={handleImmersiveVideoEnded}
              onError={handleImmersiveVideoEnded} // Also exit on error
              objectFit="contain"
            />
          </div>
          <div className="flex-1 relative p-6 flex items-start justify-center overflow-y-auto">
            <p className="font-typewriter text-lg md:text-xl text-white/95 text-center w-full whitespace-pre-wrap">
              {immersiveVideoPodcast.transcript}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-between transition-all duration-1000"
    >
      <BackgroundImage imageUrl={STATIC_BACKGROUND_URL} overlayClass={overlayClass} />

      <div className="absolute left-0 top-0 h-full w-auto z-0 pointer-events-none">
        <img
          key={timeOfDay}
          src={CHARACTER_IMAGES[timeOfDay]}
          alt={`Anfitrión de ${timeOfDay}`}
          className="h-full object-cover object-left animate-fade-in opacity-50"
        />
      </div>

      <div className="absolute left-[-4.5rem] md:left-[-3rem] top-0 bottom-0 flex items-center z-10 pointer-events-none">
          <h1 className="transform -rotate-90 text-white font-brittany text-6xl md:text-8xl tracking-wider whitespace-nowrap opacity-25">
              El Nexo Digital
          </h1>
      </div>
      
      <div className="absolute right-2 md:right-3 top-0 h-full flex items-center z-10 pointer-events-none">
          <p className="[writing-mode:vertical-rl] transform rotate-180 font-display text-lg md:text-xl text-white tracking-[0.1em] md:tracking-[0.15em] opacity-70 whitespace-nowrap">
              {showInfoText}
          </p>
      </div>

      <div className="flex justify-center items-start gap-4 md:gap-8 z-10 pt-4 md:pt-8">
          {mainPlayerItem && (
          <CircularPlayer
              item={mainPlayerItem}
              isPlaying={isMainPlayerActive}
              onTogglePlay={handleMainPlayerToggle}
          />
          )}
          <button
              onClick={handleVibeChange}
              aria-label="Cambiar la onda"
              className="relative w-28 h-28 md:w-36 md:h-36 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-full"
          >
              <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full absolute top-0 left-0 transition-transform duration-700 ease-in-out group-hover:rotate-180"
              >
                  <defs>
                  <path
                      id="text-arc"
                      d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                  </defs>
                  <text
                      className="font-display text-[9px] md:text-[11px] text-white tracking-[0.15em] opacity-70"
                      fill="currentColor"
                  >
                  <textPath href="#text-arc" startOffset="75%" textAnchor="middle">
                      CAMBIAR LA ONDA
                  </textPath>
                  </text>
              </svg>

              <img
                  src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1756851098/Generated_Image_September_02__2025_-_1_54PM-removebg-preview_fpoafd.png"
                  alt="Un martillo y cincel de piedra descansan sobre un montón de rocas."
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
          </button>
      </div>

      <div className="flex flex-col items-center gap-4 px-4 z-10 pb-4 md:pb-8">
          <div className="w-full max-w-3xl text-center pointer-events-none">
              {mainPlayerItem?.type === 'music' && mainPlayerItem.description && (
              <TypewriterText
                  key={mainPlayerItem.videoId} 
                  text={mainPlayerItem.description}
              />
              )}
          </div>

          <div className="w-full max-w-xl aspect-[1080/337] rounded-2xl shadow-2xl overflow-hidden bg-black opacity-70">
              <VideoPlayer 
                  videoUrl={currentVideoUrl} 
                  loop={false}
                  muted={true}
                  onEnded={handleVideoEnded}
                  onError={handleVideoError}
              />
          </div>
      </div>


      {isPlaying && currentAudioId && (
        <AudioPlayer 
          videoId={currentAudioId} 
          onEnded={handleAudioEnded}
          onError={handleAudioError}
          volume={audioPlayerVolume}
          audioContext={masterAudioContextRef.current}
          audioDestination={masterAudioDestinationRef.current}
        />
      )}
      
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        {installPromptEvent && <InstallPwaButton onClick={handleInstallApp} />}
        {isOwner && (
            <OwnerControls 
                onShowPopup={() => handleShowPopup()} 
                onShowConfig={() => setShowConfigModal(true)}
                onTestVideoPodcast={handleTestVideoPodcast}
            />
        )}
      </div>

      <PopupModal 
        content={activePopup} 
        onClose={handleClosePopup}
        audioContext={masterAudioContextRef.current}
        audioDestination={masterAudioDestinationRef.current}
      />
      
      {showConfigModal && (
          <ConfigModal 
            onClose={() => setShowConfigModal(false)}
            userInfo={userInfo}
            timeGreeting={timeGreeting}
            ai={ai}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
      )}
    </main>
  );
}
