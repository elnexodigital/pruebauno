import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  videoId: string;
  onEnded?: () => void;
  onError?: () => void;
  volume?: number;
  audioContext: AudioContext | null;
  audioDestination: AudioNode | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ videoId, onEnded, onError, volume = 1.0, audioContext, audioDestination }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    if (!audioEl || !audioContext || !audioDestination) return;

    // Setup the Web Audio graph only once
    if (!sourceNodeRef.current) {
      try {
        const source = audioContext.createMediaElementSource(audioEl);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        // Connect source -> analyser -> master chain destination
        source.connect(analyser).connect(audioDestination);
        
        sourceNodeRef.current = source;
        analyserRef.current = analyser;
      } catch (e) {
        console.error("Error setting up Web Audio graph.", e);
        return; // Stop if graph setup fails
      }
    }

    const startSilenceDetection = () => {
      // Cleanup previous animation frame loop
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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

    // Start silence detection when the component is ready
    startSilenceDetection();
    
    return () => {
      // Clean up the animation frame on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioContext, audioDestination]);


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
      onError={onError}
      crossOrigin="anonymous" // Required for MediaElementAudioSourceNode
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;