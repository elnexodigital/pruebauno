import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  loop?: boolean;
  onEnded?: () => void;
  onError?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, loop = true, onEnded, onError }) => {
  if (!videoUrl) return null;

  return (
    <video
      key={videoUrl} // Use key to force re-render when src changes
      className="w-full h-full object-cover"
      src={videoUrl}
      autoPlay
      muted
      loop={loop}
      playsInline // Important for iOS autoplay
      onEnded={onEnded}
      onError={onError}
    />
  );
};

export default VideoPlayer;