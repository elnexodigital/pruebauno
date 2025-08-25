import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTimeOfDay } from './hooks/useTimeOfDay';
import { PODCASTS, MUSIC_IDS, VIDEO_URLS } from './constants';
import AudioPlayer from './components/AudioPlayer';
import VideoPlayer from './components/VideoPlayer';
import PopupModal from './components/PopupModal';
import OwnerControls from './components/OwnerControls';
import WelcomeForm from './components/WelcomeForm';
import ShuffleIcon from './components/icons/ShuffleIcon';
import CircularPlayer from './components/CircularPlayer';
import SquarePlayer from './components/SquarePlayer';
import BackgroundVideo from './components/BackgroundVideo';
import { TimeOfDay, UserInfo, MediaItem, Podcast } from './types';

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

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

  const pickRandomMedia = useCallback((): MediaItem => {
    const isPodcast = Math.random() > 0.5;
    if (isPodcast && PODCASTS.length > 0) {
      const podcast = getRandomItem(PODCASTS);
      return {
        type: 'podcast',
        videoId: podcast.videoId,
        coverUrl: podcast.coverUrl,
        title: podcast.title
      };
    }
    return {
      type: 'music',
      videoId: getRandomItem(MUSIC_IDS),
      coverUrl: 'logo' 
    };
  }, []);
  
  const shuffleMedia = useCallback(() => {
    const randomItem = pickRandomMedia();
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
      shuffleMedia();
    }
  }, [isStarted, mainPlayerItem, shuffleMedia]);


  const handleUserSaved = (user: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setUserInfo(user);
  };

  const handleStart = () => {
    setIsStarted(true);
  };
  
  const timeGreeting = useMemo(() => {
    switch (timeOfDay) {
      case TimeOfDay.Morning: return 'Buenos Días';
      case TimeOfDay.Afternoon: return 'Buenas Tardes';
      case TimeOfDay.Night: return 'Buenas Noches';
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
          <h1 className="font-brittany text-3xl md:text-5xl font-normal text-white mb-2 tracking-wide">El Nexo Digital</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">{timeGreeting} {userInfo.name}, te estábamos esperando.</p>
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
          <h1 className="transform -rotate-90 text-white font-brittany text-8xl md:text-9xl opacity-25 tracking-wider whitespace-nowrap">
              El Nexo Digital
          </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 z-10">
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

      {isPlaying && currentAudioId && <AudioPlayer videoId={currentAudioId} />}
      
      <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-4">
         <OwnerControls onShowPopup={() => setIsPopupOpen(true)} />
         <button
            onClick={shuffleMedia}
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