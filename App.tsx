// FIX: Removed unresolved Vite client types reference to fix "Cannot find type" error.
// The code now safely accesses `import.meta.env` via a type cast.

// FIX: Corrected the invalid React import and added missing hook imports (useState, useEffect, etc.) to resolve 'Cannot find name' errors.
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { PODCASTS, MUSIC_TRACKS, VIDEO_URLS, GREETING_AUDIOS, AUDIO_STINGERS, POPUP_SCHEDULE, STATIC_BACKGROUND_URL, VIDEO_PODCASTS } from './constants';
import AudioPlayer from './components/AudioPlayer';
import VideoPlayer from './components/VideoPlayer';
import PopupModal from './components/PopupModal';
import WelcomeForm from './components/WelcomeForm';
import CircularPlayer from './components/CircularPlayer';
import BackgroundImage from './components/BackgroundVideo';
import TypewriterText from './components/TypewriterText';
import { TimeOfDay, UserInfo, MediaItem, Podcast, PopupContent, GroundingSource, NewsItem, WeatherInfo, VideoPodcast } from './types';
import OwnerControls from './components/OwnerControls';
import ConfigModal from './components/ConfigModal';
import WelcomeConfirmationModal from './components/WelcomeConfirmationModal';

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

const fetchNews = async (): Promise<{ title: string; text: NewsItem[]; sources: GroundingSource[] } | null> => {
  if (!ai) {
    return {
        title: "Error de Configuración",
        text: [{ headline: "Clave de API no encontrada", summary: "La variable VITE_API_KEY no se encontró en este entorno. Las funciones de IA están deshabilitadas." }],
        sources: [],
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Genera un resumen de 4 noticias relevantes y recientes. Incluye una noticia internacional, una de Uruguay, una de deportes y una de arte o cultura. Para cada una, da un titular conciso y un resumen de no más de 25 palabras. Usa este formato exacto para cada noticia, separándolas con un doble salto de línea:\nTITULAR: [el titular]\nRESUMEN: [el resumen]',
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
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Cuál es el clima actual en Juan Lacaze, Colonia, Uruguay? Dame la temperatura en Celsius, una descripción muy breve (ej. 'Soleado', 'Parcialmente Nublado'), y la velocidad del viento en km/h.",
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
  const [playerToResume, setPlayerToResume] = useState<'main' | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [immersiveVideoPodcast, setImmersiveVideoPodcast] = useState<VideoPodcast | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const isPlaying = activePlayer !== null;
  const isMainPlayerActive = activePlayer === 'main';
  
  const stingerTimeoutRef = useRef<number | null>(null);
  const stingerAudioContextRef = useRef<AudioContext | null>(null);
  
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
        if (parsedUser.name && parsedUser.name.trim().toLowerCase() === 'leo castrillo') {
            setIsOwner(true);
        }
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
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
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Effect to check if the PWA is already installed
  useEffect(() => {
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
        setIsPwaInstalled(true);
        setInstallPromptEvent(null);
      }
    };
    checkInstalled();
    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setInstallPromptEvent(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);


  // Effect for handling audio stingers with auto-ducking
  useEffect(() => {
    let stingerAudio: HTMLAudioElement | null = null;

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
      try {
        stingerAudio = new Audio(randomStingerUrl);
        stingerAudio.crossOrigin = "anonymous"; // Required for Web Audio API

        const onStingerEnd = () => {
          setMainPlayerVolume(1.0); // Restore main audio volume
          if (stingerAudio) {
            stingerAudio.removeEventListener('ended', onStingerEnd);
            stingerAudio.removeEventListener('error', onStingerError);
          }
          scheduleTimeout();
        };

        const onStingerError = (e: ErrorEvent | string) => {
          console.error("Audio stinger playback error:", e);
          setMainPlayerVolume(1.0); // Restore volume on error too
          if (stingerAudio) {
            stingerAudio.removeEventListener('ended', onStingerEnd);
            stingerAudio.removeEventListener('error', onStingerError);
          }
          scheduleTimeout();
        };

        stingerAudio.addEventListener('ended', onStingerEnd);
        stingerAudio.addEventListener('error', onStingerError);
        
        setMainPlayerVolume(0.1); // Duck main audio to make the stinger stand out.

        // Use Web Audio API to boost volume beyond 1.0
        try {
          if (!stingerAudioContextRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
              stingerAudioContextRef.current = new AudioContext();
            }
          }

          if (stingerAudioContextRef.current && stingerAudioContextRef.current.state === 'suspended') {
            stingerAudioContextRef.current.resume();
          }

          if (stingerAudioContextRef.current) {
            const context = stingerAudioContextRef.current;
            const source = context.createMediaElementSource(stingerAudio);
            const gainNode = context.createGain();
            gainNode.gain.value = 2.5; // 150% volume boost
            source.connect(gainNode).connect(context.destination);
          } else {
            // Fallback for browsers without Web Audio API
            stingerAudio.volume = 1.0;
          }
        } catch (webAudioError) {
          console.error("Web Audio API for stinger failed, using standard volume.", webAudioError);
          stingerAudio.volume = 1.0;
        }


        stingerAudio.play().catch(error => {
          console.error("Audio stinger playback failed:", error);
          onStingerError(error.toString());
        });

      } catch (error) {
        console.error("Error creating audio stinger:", error);
        scheduleTimeout(); // Try to schedule next one anyway
      }
    };
    
    // Conditions to run the stinger logic
    if (!isMainPlayerActive || mainPlayerItem?.type !== 'music' || AUDIO_STINGERS.length === 0) {
      if (stingerTimeoutRef.current) clearTimeout(stingerTimeoutRef.current);
      return;
    }

    scheduleTimeout();

    // Cleanup function
    return () => {
      if (stingerTimeoutRef.current) {
        clearTimeout(stingerTimeoutRef.current);
      }
      // Stop any stinger that might be playing
      if (stingerAudio) {
        stingerAudio.pause();
        stingerAudio.src = '';
      }
      // Always restore volume on cleanup
      setMainPlayerVolume(1.0);
    };
    
  }, [isMainPlayerActive, mainPlayerItem]);

  const handleShowPopup = useCallback(async (content?: PopupContent) => {
      let popupContent: PopupContent | null = content || null;
      if (!popupContent) {
        // This logic is for manual triggering (e.g., OwnerControls)
        const placeholder: PopupContent = {
            type: 'news',
            time: '',
            title: "Generando Noticias...",
            text: "Un momento por favor, estamos conectando con el nexo para traerte las últimas novedades.",
        };
        setActivePopup(placeholder);
        
        const [newsContent, weatherContent] = await Promise.all([
          fetchNews(),
          fetchWeather()
        ]);

        if (newsContent) {
           popupContent = { ...placeholder, ...newsContent, weather: weatherContent ?? undefined };
        } else {
           popupContent = { 
               ...placeholder, 
               title: 'Error', 
               text: 'No se pudieron obtener las noticias.' 
           };
        }
    }

    if (popupContent) {
        if (popupContent.audioUrl || popupContent.videoUrl || popupContent.type === 'news') {
          if (activePlayer) {
            setPlayerToResume(activePlayer);
            setActivePlayer(null);
          }
        }
        setActivePopup(popupContent);
    }
  }, [activePlayer]);

  // Effect for scheduled popups
  useEffect(() => {
    if (!isStarted) return;

    const checkTime = async () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const scheduledPopup = POPUP_SCHEDULE.find(p => p.time === currentTime);

      if (scheduledPopup && !shownPopups.includes(scheduledPopup.time)) {
        if (scheduledPopup.type === 'news') {
           handleShowPopup({
              ...scheduledPopup,
              title: "Generando Noticias...",
              text: "Un momento por favor, estamos conectando con el nexo para traerte las últimas novedades.",
          });
          
          const [newsContent, weatherContent] = await Promise.all([
            fetchNews(),
            fetchWeather()
          ]);

          if (newsContent) {
            handleShowPopup({
              ...scheduledPopup,
              ...newsContent,
              weather: weatherContent ?? undefined,
            });
          }
        } else {
          handleShowPopup(scheduledPopup);
        }
        setShownPopups(prev => [...prev, scheduledPopup.time]);
      }
    };

    const intervalId = setInterval(checkTime, 60000); // Check every minute

    // Reset shown popups at midnight for subsequent days
    const now = new Date();
    const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0).getTime() - now.getTime();
    const midnightTimer = setTimeout(() => {
        setShownPopups([]);
    }, msUntilMidnight);

    return () => {
      clearInterval(intervalId);
      clearTimeout(midnightTimer);
    };
  }, [isStarted, shownPopups, handleShowPopup]);

  const handleClosePopup = () => {
    if (playerToResume) {
      setActivePlayer(playerToResume);
    }
    setActivePopup(null);
    setPlayerToResume(null);
  };
  
  const handleUserSaved = (user: UserInfo) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    setUserInfo(user);
    if (user.name && user.name.trim().toLowerCase() === 'leo castrillo') {
        setIsOwner(true);
    }
  };
  
  const handleInstallApp = async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt.
    // The `userChoice` property returns a Promise that resolves to an object with an `outcome` property.
    await installPromptEvent.userChoice;
    // We've used the prompt, and it can't be used again, so clear it.
    setInstallPromptEvent(null);
  };

  const handleStart = async () => {
    setIsStarted(true);

    // This is a one-time check. If the prompt is available and the app isn't installed, we use it.
    if (installPromptEvent && !isPwaInstalled) {
      await handleInstallApp();
    }
    
    // Always show the welcome modal after the user starts.
    setShowWelcomeModal(true);

    // Play greeting audio after a small delay to not overlap with modals
    setTimeout(() => {
      let greetingUrls: string[] = [];
      switch (timeOfDay) {
        case TimeOfDay.Morning:
          greetingUrls = GREETING_AUDIOS.morning;
          break;
        case TimeOfDay.Afternoon:
          greetingUrls = GREETING_AUDIOS.afternoon;
          break;
        case TimeOfDay.Night:
          greetingUrls = GREETING_AUDIOS.night;
          break;
        case TimeOfDay.Noctambulo:
          greetingUrls = GREETING_AUDIOS.noctambulo;
          break;
      }
      
      if (greetingUrls.length > 0) {
        const randomGreetingUrl = getRandomItem(greetingUrls);
        try {
          const greetingAudio = new Audio(randomGreetingUrl);
          greetingAudio.play().catch(error => {
            // Autoplay might be blocked by the browser. Log error for debugging.
            console.error("Greeting audio autoplay failed:", error);
          });
        } catch (error) {
          console.error("Error creating or playing greeting audio:", error);
        }
      }
    }, 500);
  };
  
    const handleChangeUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserInfo(null);
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
  
  const characterInfo = useMemo(() => {
    switch (timeOfDay) {
      case TimeOfDay.Morning:
        return {
          src: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Grace-removebg-preview_julviv.png',
          alt: 'Personaje de la mañana, Graciela Aquelarre',
        };
      case TimeOfDay.Afternoon:
        return {
          src: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Sergio-removebg-preview_wl4ewa.png',
          alt: 'Personaje de la tarde, Sergio Será',
        };
      case TimeOfDay.Night:
      case TimeOfDay.Noctambulo:
        return {
          src: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Gabriel-removebg-preview_u7x1rs.png',
          alt: 'Personaje de la noche, Gabriel Callum',
        };
      default:
        return null;
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
    // Use a timeout to allow for the exit animation/transition before starting next media
    setTimeout(() => {
      shuffleMedia({ forceMusic: true });
    }, 300);
  }, [shuffleMedia]);

  const handleTestVideoPodcast = () => {
    if (VIDEO_PODCASTS.length > 0) {
      const randomVP = getRandomItem(VIDEO_PODCASTS);
      setActivePlayer(null); // Stop any other audio
      setImmersiveVideoPodcast(randomVP);
    }
  };

  const audioPlayerVolume = isMainPlayerActive && mainPlayerItem?.type === 'music' ? mainPlayerVolume : 1.0;

  if (!userInfo) {
    return <WelcomeForm onSave={handleUserSaved} imageUrl={STATIC_BACKGROUND_URL} overlayClass={overlayClass} />;
  }

  if (!isStarted) {
    return (
      <div 
        className="relative w-screen h-screen flex flex-col items-center justify-center transition-all duration-1000 p-4"
      >
        <BackgroundImage imageUrl={STATIC_BACKGROUND_URL} overlayClass={overlayClass} />
        <div className="relative text-center p-8 bg-black bg-opacity-30 rounded-2xl shadow-2xl backdrop-blur-lg space-y-6 z-10 max-w-md w-full">
          <h1 className="font-brittany text-4xl md:text-5xl font-normal text-white mb-2 tracking-wide">El Nexo Digital</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-4">{timeGreeting}, {userInfo.name}.</p>
          
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleStart}
              className="w-full px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Seguir como {userInfo.name}
            </button>

            <button
              onClick={handleChangeUser}
              className="text-gray-300 hover:text-white hover:underline transition-colors text-sm mt-4"
            >
              ¿No eres {userInfo.name}? Cambiar de usuario
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (immersiveVideoPodcast) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div 
          className="relative w-full max-w-sm aspect-[9/16] bg-black shadow-2xl rounded-lg flex flex-col overflow-hidden animate-scale-up"
        >
          <div className="w-full aspect-square">
            <VideoPlayer 
              videoUrl={immersiveVideoPodcast.videoUrl}
              loop={false}
              muted={false}
              onEnded={handleImmersiveVideoEnded}
              onError={handleImmersiveVideoEnded} // Also exit on error
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
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000"
    >
      <BackgroundImage imageUrl={STATIC_BACKGROUND_URL} overlayClass={overlayClass} />

      {characterInfo && (
        <img
          src={characterInfo.src}
          alt={characterInfo.alt}
          className="absolute top-1/2 left-0 -translate-y-1/2 h-[70vh] w-auto object-contain pointer-events-none animate-fade-in opacity-70 transition-opacity duration-500"
          style={{ zIndex: 1 }}
        />
      )}

      <div className="absolute left-[-2rem] md:left-[-3rem] top-0 bottom-0 flex items-center z-10 pointer-events-none">
          <h1 className="transform -rotate-90 text-white font-brittany text-7xl md:text-8xl tracking-wider whitespace-nowrap opacity-25">
              El Nexo Digital
          </h1>
      </div>
      
      <div className="absolute right-2 md:right-3 top-0 h-full flex items-center z-10 pointer-events-none">
          <p className="[writing-mode:vertical-rl] transform rotate-180 font-display text-lg md:text-xl text-white tracking-[0.1em] md:tracking-[0.15em] opacity-70 whitespace-nowrap">
              {showInfoText}
          </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 z-10 opacity-70">
        {mainPlayerItem && (
          <CircularPlayer
            item={mainPlayerItem}
            isPlaying={isMainPlayerActive}
            onTogglePlay={handleMainPlayerToggle}
          />
        )}
        <div className="w-full max-w-xl aspect-[1080/337] rounded-2xl shadow-2xl overflow-hidden bg-black">
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
        />
      )}
      
       <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-3xl text-center px-4 z-10 pointer-events-none">
        {mainPlayerItem?.type === 'music' && mainPlayerItem.description && (
          <TypewriterText
            key={mainPlayerItem.videoId} 
            text={mainPlayerItem.description}
          />
        )}
      </div>
      
      {isOwner && (
        <div className="absolute top-4 right-4 z-20">
            <OwnerControls 
                onShowPopup={() => handleShowPopup()} 
                onShowConfig={() => setShowConfigModal(true)}
                onTestVideoPodcast={handleTestVideoPodcast}
            />
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={handleVibeChange}
          aria-label="Cambiar la onda"
          className="relative w-36 h-36 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-full"
        >
          {/* SVG for curved text */}
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
              className="font-display text-[11px] text-white tracking-[0.15em] opacity-70"
              fill="currentColor"
            >
              <textPath href="#text-arc" startOffset="75%" textAnchor="middle">
                CAMBIAR LA ONDA
              </textPath>
            </text>
          </svg>

          {/* The image in the center */}
          <img
            src="https://res.cloudinary.com/ddmj6zevz/image/upload/v1756851098/Generated_Image_September_02__2025_-_1_54PM-removebg-preview_fpoafd.png"
            alt="Un martillo y cincel de piedra descansan sobre un montón de rocas."
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full object-cover shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          />
        </button>
      </div>

      <PopupModal content={activePopup} onClose={handleClosePopup} />
      
      {showConfigModal && (
          <ConfigModal 
            onClose={() => setShowConfigModal(false)}
            userInfo={userInfo}
            timeGreeting={timeGreeting}
            ai={ai}
          />
      )}

      {showWelcomeModal && (
        <WelcomeConfirmationModal onClose={() => setShowWelcomeModal(false)} />
      )}
    </main>
  );
}