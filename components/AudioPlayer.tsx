import React from 'react';

interface AudioPlayerProps {
  videoId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ videoId }) => {
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
    <audio src={videoId} autoPlay loop style={{ display: 'none' }} />
  );
};

export default AudioPlayer;