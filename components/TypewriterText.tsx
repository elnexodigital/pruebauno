

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsVisible(true);
    
    let typingInterval: number;
    let hideTimeout: number;

    if (text) {
      let i = 0;
      typingInterval = window.setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, speed);

      hideTimeout = window.setTimeout(() => {
        setIsVisible(false);
      }, 20000); // Hide after 20 seconds

      return () => {
        clearInterval(typingInterval);
        clearTimeout(hideTimeout);
      };
    }
  }, [text, speed]);

  if (!isVisible) {
    return null;
  }

  return (
    <p className={className}>
      {displayedText}
      {!isComplete && <span className="cursor-blink">|</span>}
    </p>
  );
};

export default TypewriterText;