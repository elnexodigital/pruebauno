import React from 'react';

interface BackgroundVideoProps {
  videoUrl: string;
  overlayClass: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoUrl, overlayClass }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
      <video
        key={videoUrl} // Use key to force re-render when src changes
        className="w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline // Important for iOS autoplay
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
};

export default BackgroundVideo;
