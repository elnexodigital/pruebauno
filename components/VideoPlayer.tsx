import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  onEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onEnded }) => {
  if (!videoUrl) return null;

  return (
    <video
      key={videoUrl} // Use key to force re-render when src changes
      className="w-full h-full object-cover"
      src={videoUrl}
      autoPlay
      muted
      playsInline // Important for iOS autoplay
      onEnded={onEnded}
    />
  );
};

export default VideoPlayer;