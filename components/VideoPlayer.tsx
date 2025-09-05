import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, loop = true, muted = true, onEnded, onError, objectFit = 'cover' }) => {
  if (!videoUrl) return null;

  return (
    <video
      key={videoUrl} // Use key to force re-render when src changes
      className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
      src={videoUrl}
      autoPlay
      muted={muted}
      loop={loop}
      playsInline // Important for iOS autoplay
      onEnded={onEnded}
      onError={onError}
    />
  );
};

export default VideoPlayer;