import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  videoId: string;
  onEnded?: () => void;
  volume?: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ videoId, onEnded, volume = 1.0 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const silenceStartRef = useRef<number | null>(null);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  // Effect to control audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audioEl = audioRef.current;
    
    // Cleanup previous animation frame loop
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (!audioEl || !videoId || !videoId.startsWith('http')) {
      return;
    }

    const setupWebAudio = () => {
      if (!audioContextRef.current) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContext) {
            console.warn("Web Audio API is not supported in this browser.");
            return;
          }
          audioContextRef.current = new AudioContext();
        } catch (e) {
          console.error("Failed to create AudioContext.", e);
          return;
        }
      }

      const audioContext = audioContextRef.current;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      if (!sourceNodeRef.current) {
        try {
          sourceNodeRef.current = audioContext.createMediaElementSource(audioEl);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyserRef.current = analyser;

          sourceNodeRef.current.connect(analyser);
          analyser.connect(audioContext.destination);
        } catch (e) {
          console.error("Error setting up Web Audio graph.", e);
          // Reset refs on failure
          audioContextRef.current = null;
          sourceNodeRef.current = null;
          analyserRef.current = null;
          return;
        }
      }
      
      startSilenceDetection();
    };

    const startSilenceDetection = () => {
      if (!analyserRef.current) return;
      
      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const check = () => {
        if (!audioRef.current || audioRef.current.paused || audioRef.current.ended) {
          silenceStartRef.current = null;
          animationFrameRef.current = requestAnimationFrame(check);
          return;
        }

        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / bufferLength;

        const SILENCE_THRESHOLD = 1;
        const SILENCE_DURATION_MS = 4000;
        
        const isNearEnd = audioRef.current.duration > 15 && audioRef.current.currentTime > audioRef.current.duration - 15;
        const isSilent = average < SILENCE_THRESHOLD;

        if (isSilent && isNearEnd) {
          if (silenceStartRef.current === null) {
            silenceStartRef.current = performance.now();
          } else if (performance.now() - silenceStartRef.current > SILENCE_DURATION_MS) {
            console.log(`Silence detected for ${SILENCE_DURATION_MS}ms near end of track. Skipping.`);
            if (onEndedRef.current) {
              onEndedRef.current();
            }
            return; // Stop the detection loop for this track
          }
        } else {
          silenceStartRef.current = null;
        }

        animationFrameRef.current = requestAnimationFrame(check);
      };
      
      check();
    };

    // Attempt to set up Web Audio after the element is ready to play.
    audioEl.addEventListener('canplay', setupWebAudio, { once: true });
    
    return () => {
      audioEl.removeEventListener('canplay', setupWebAudio);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [videoId]);


  if (!videoId) return null;

  const isYoutubeVideo = !videoId.startsWith('http');

  if (isYoutubeVideo) {
    const audioSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0`;
    return (
      <div className="absolute w-0 h-0 overflow-hidden">
        <iframe
          src={audioSrc}
          title="Contenido de Audio"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          className="w-0 h-0"
        ></iframe>
      </div>
    );
  }

  return (
    <audio
      ref={audioRef}
      src={videoId}
      autoPlay
      onEnded={onEnded}
      crossOrigin="anonymous" // Required for MediaElementAudioSourceNode
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;