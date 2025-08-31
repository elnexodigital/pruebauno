import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <video
      key={videoUrl} // Use key to force re-render when src changes
      className="w-full h-full object-cover"
      src={videoUrl}
      autoPlay
      muted
      loop
      playsInline // Important for iOS autoplay
    />
  );
};

export default VideoPlayer;