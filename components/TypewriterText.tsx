import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  allowScroll?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, className = '', allowScroll = false }) => {
  const [displayedText, setDisplayedText] = useState('');

  // Universal typing effect
  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const typingInterval = window.setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
      
      return () => clearInterval(typingInterval);
    }
  }, [text, speed]);

  // Logic for the non-scrolling, auto-hiding version (for music descriptions)
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (allowScroll) return; // This logic is only for the non-scrolling version
    
    setIsVisible(true);
    const hideTimeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 20000); // Hide after 20 seconds

    return () => clearTimeout(hideTimeout);
  }, [text, allowScroll]);


  if (allowScroll) {
    return (
      <div className="relative w-full">
        {/* Full text, semi-transparent, for scrolling */}
        <p 
          aria-hidden="true" 
          className={`${className} text-white/40 whitespace-pre-wrap break-words`}
        >
          {text}
        </p>
        {/* Typing text, opaque, super-imposed */}
        <p className={`${className} absolute top-0 left-0 w-full text-white/95 whitespace-pre-wrap break-words`}>
          {displayedText}
          {displayedText.length < text.length && <span className="cursor-blink">|</span>}
        </p>
      </div>
    );
  }
  
  // Render logic for the music description typewriter
  if (!isVisible) {
    return null;
  }
  
  const isComplete = displayedText.length === text.length;

  return (
    <p className={className}>
      {displayedText}
      {!isComplete && <span className="cursor-blink">|</span>}
    </p>
  );
};

export default TypewriterText;
