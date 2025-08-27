import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { PODCASTS, MUSIC_TRACKS, VIDEO_URLS, GREETING_AUDIOS, AUDIO_STINGERS } from './constants';
import AudioPlayer from './components/AudioPlayer';
import VideoPlayer from './components/VideoPlayer';
import PopupModal from './components/PopupModal';
import OwnerControls from './components/OwnerControls';
import WelcomeForm from './components/WelcomeForm';
import ShuffleIcon from './components/icons/ShuffleIcon';
import CircularPlayer from './components/CircularPlayer';
import SquarePlayer from './components/SquarePlayer';
import BackgroundVideo from './components/BackgroundVideo';
import TypewriterText from './components/TypewriterText';
import { TimeOfDay, UserInfo, MediaItem, Podcast, MusicTrack } from './types';

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Determines the current music time tag based on specific time ranges.
 * @returns {1 | 2 | 3 | 4} 1 for morning, 2 for afternoon, 3 for night, or 4 for noctambulo.
 */
const getCurrentMusicTag = (): 1 | 2 | 3 | 4 => {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  // Noctámbulo (4): 22:01 to 07:29
  if (totalMinutes >= 1321 || totalMinutes <= 449) {
    return 4;
  }
  // Morning (1): 07:30 to 12:00
  if (totalMinutes >= 450 && totalMinutes <= 720) {
    return 1;
  }
  // Afternoon (2): 12:01 to 18:00
  if (totalMinutes >= 721 && totalMinutes <= 1080) {
    return 2;
  }
  // Night (3): 18:01 to 22:00
  return 3;
};


export default function App(): React.ReactNode {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  
  const { timeOfDay, backgroundUrl, overlayClass } = useTimeOfDay();

  const [mainPlayerItem, setMainPlayerItem] = useState<MediaItem | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(() => getRandomItem(VIDEO_URLS));
  const [latestPodcast] = useState<Podcast>(PODCASTS[0]);
  const [activePlayer, setActivePlayer] = useState<'main' | 'latest' | null>(null);
  const [currentAudioId, setCurrentAudioId] = useState<string>('');

  const isPlaying = activePlayer !== null;
  const isMainPlayerActive = activePlayer === 'main';
  const isLatestPlayerActive = activePlayer === 'latest';
  
  const stingerTimeoutRef = useRef<number | null>(null);

  const pickRandomMedia = useCallback((options: { forceMusic?: boolean } = {}): MediaItem => {
    const { forceMusic = false } = options;
    const currentTag = getCurrentMusicTag();
    let suitableTracks: MusicTrack[] = MUSIC_TRACKS.filter(track => track.tags.includes(currentTag));
    
    // If no tracks for the specific time are found, consider all music tracks.
    if (suitableTracks.length === 0) {
      suitableTracks = MUSIC_TRACKS;
    }

    // Determine if a podcast should be played. Never on forceMusic.
    const canPlayMusic = suitableTracks.length > 0;
    const shouldPlayPodcast = !forceMusic && Math.random() > 0.5;

    if (canPlayMusic && !shouldPlayPodcast) {
        const track = getRandomItem(suitableTracks);
        return {
            type: 'music',
            videoId: track.url,
            coverUrl: 'logo',
            title: track.title,
            description: track.description,
        };
    }

    // Fallback to podcast if music isn't available or by random chance.
    const podcast = getRandomItem(PODCASTS);
    return {
        type: 'podcast',
        videoId: podcast.videoId,
        coverUrl: podcast.coverUrl,
        title: podcast.title,
        artist: podcast.artist,
    };
  }, []);
  
  const shuffleMedia = useCallback((options: { forceMusic?: boolean } = {}) => {
    const randomItem = pickRandomMedia(options);
    setMainPlayerItem(randomItem);
    setActivePlayer('main');
    setCurrentAudioId(randomItem.videoId);
    setCurrentVideoUrl(getRandomItem(VIDEO_URLS));
  }, [pickRandomMedia]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      localStorage.removeItem('userInfo');
    }
  }, []);

  useEffect(() => {
    if (isStarted && !mainPlayerItem) {
      shuffleMedia({ forceMusic: true });
    }
  }, [isStarted, mainPlayerItem, shuffleMedia]);

  // Effect for handling audio stingers
  useEffect(() => {
    const clearStingerTimeout = () => {
      if (stingerTimeoutRef.current) {
        clearTimeout(stingerTimeoutRef.current);
        stingerTimeoutRef.current = null;
      }
    };

    const scheduleNextStinger = () => {
      clearStingerTimeout();

      // Conditions to play a stinger: music must be playing in the main player
      // and there must be stingers available.
      if (!isMainPlayerActive || mainPlayerItem?.type !== 'music' || AUDIO_STINGERS.length === 0) {
        return;
      }

      // Random time between 1 minute (60,000ms) and 3 minutes (180,000ms)
      const minDelay = 1 * 60 * 1000;
      const maxDelay = 3 * 60 * 1000;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      stingerTimeoutRef.current = window.setTimeout(() => {
        const randomStingerUrl = getRandomItem(AUDIO_STINGERS);
        try {
          const stingerAudio = new Audio(randomStingerUrl);
          stingerAudio.play().catch(error => {
            console.error("Audio stinger playback failed:", error);
          });
        } catch (error) {
          console.error("Error creating or playing audio stinger:", error);
        }
        
        // Once a stinger plays, schedule the next one.
        scheduleNextStinger();
      }, randomDelay);
    };

    // Schedule the first stinger or reschedule if dependencies change.
    scheduleNextStinger();

    // Cleanup function to clear the timeout when the component unmounts
    // or when the dependencies change, preventing memory leaks.
    return clearStingerTimeout;
    
  }, [isMainPlayerActive, mainPlayerItem]); // Re-run this effect if the player state or item changes.


  const handleUserSaved = (user: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setUserInfo(user);
  };

  const handleStart = () => {
    setIsStarted(true);

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

  const handleMainPlayerToggle = () => {
    if (isMainPlayerActive) {
      setActivePlayer(null);
      setCurrentAudioId('');
    } else if(mainPlayerItem) {
      setActivePlayer('main');
      setCurrentAudioId(mainPlayerItem.videoId);
    }
  };

  const handleLatestPlayerToggle = () => {
    if (isLatestPlayerActive) {
      setActivePlayer(null);
      setCurrentAudioId('');
    } else {
      setActivePlayer('latest');
      setCurrentAudioId(latestPodcast.videoId);
    }
  };

  const handleAudioEnded = useCallback(() => {
    // When a music track ends, shuffle to a new one automatically.
    if (mainPlayerItem?.type === 'music') {
      shuffleMedia({ forceMusic: true });
    }
  }, [mainPlayerItem, shuffleMedia]);


  if (!userInfo) {
    return <WelcomeForm onSave={handleUserSaved} backgroundUrl={backgroundUrl} overlayClass={overlayClass} />;
  }

  if (!isStarted) {
    return (
      <div 
        className="relative w-screen h-screen flex flex-col items-center justify-center transition-all duration-1000 p-4"
      >
        <BackgroundVideo videoUrl={backgroundUrl} overlayClass={overlayClass} />
        <div className="relative text-center p-8 bg-black bg-opacity-30 rounded-2xl shadow-2xl backdrop-blur-lg space-y-4 z-10">
          <h1 className="font-brittany text-3xl md:text-4xl font-normal text-white mb-2 tracking-wide">El Nexo Digital</h1>
          <p className="text-base md:text-lg text-gray-200 mb-8">{timeGreeting} {userInfo.name}, te estábamos esperando.</p>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000"
    >
      <BackgroundVideo videoUrl={backgroundUrl} overlayClass={overlayClass} />

      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm z-20">
        {timeOfDay}
      </div>

      <div className="absolute left-[-2rem] md:left-[-3rem] top-0 bottom-0 flex items-center z-10 pointer-events-none">
          <h1 className="transform -rotate-90 text-white font-brittany text-7xl md:text-8xl opacity-25 tracking-wider whitespace-nowrap">
              El Nexo Digital
          </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 z-10">
        {mainPlayerItem && (
          <CircularPlayer
            item={mainPlayerItem}
            isPlaying={isMainPlayerActive}
            onTogglePlay={handleMainPlayerToggle}
          />
        )}
        <SquarePlayer
          podcast={latestPodcast}
          isPlaying={isLatestPlayerActive}
          onTogglePlay={handleLatestPlayerToggle}
        />
        <div className="w-full max-w-xl aspect-[1080/337] rounded-2xl shadow-2xl overflow-hidden bg-black">
          <VideoPlayer videoUrl={currentVideoUrl} />
        </div>
      </div>

      {isPlaying && currentAudioId && (
        <AudioPlayer videoId={currentAudioId} onEnded={handleAudioEnded} />
      )}
      
       <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-3xl text-center px-4 z-10 pointer-events-none">
        {mainPlayerItem?.type === 'music' && mainPlayerItem.description && (
          <TypewriterText
            key={mainPlayerItem.videoId} 
            text={mainPlayerItem.description}
            className="font-typewriter text-lg md:text-xl text-white/90 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block animate-tremble"
          />
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-4">
         <OwnerControls onShowPopup={() => setIsPopupOpen(true)} />
         <button
            onClick={() => shuffleMedia()}
            aria-label="Mezclar medios"
            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-300 shadow-lg"
          >
            <ShuffleIcon />
          </button>
      </div>

      <PopupModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Anuncio Especial</h2>
        <p className="text-gray-600 mb-6">
          Esta es una ventana emergente de ejemplo. El propietario de la aplicación puede mostrarla en cualquier momento para mensajes o promociones importantes.
        </p>
        <img src="https://picsum.photos/400/200" alt="Imagen aleatoria" className="rounded-lg mb-6"/>
        <button
          onClick={() => setIsPopupOpen(false)}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cerrar
        </button>
      </PopupModal>
    </main>
  );
}