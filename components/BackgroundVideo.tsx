import React from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  overlayClass: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageUrl, overlayClass }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
      <img
        src={imageUrl}
        alt="Fondo abstracto"
        className="w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
};

export default BackgroundImage;
