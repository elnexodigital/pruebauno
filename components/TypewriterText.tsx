import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  allowScroll?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50, allowScroll = false }) => {
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

  const digitalClasses = "font-typewriter text-lg md:text-xl text-white/90 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block animate-neon-glitch";

  if (allowScroll) {
    // FIX: Added font styling to the scrollable variant to ensure transcripts are displayed correctly.
    const scrollClasses = {
      base: "font-typewriter text-lg md:text-xl text-white/40 whitespace-pre-wrap break-words",
      overlay: "font-typewriter text-lg md:text-xl absolute top-0 left-0 w-full text-white/90 whitespace-pre-wrap break-words"
    }

    return (
      <div className="relative w-full">
        <p 
          aria-hidden="true" 
          className={scrollClasses.base}
        >
          {text}
        </p>
        <p className={scrollClasses.overlay}>
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
    <p className={digitalClasses}>
      {displayedText}
      {!isComplete && <span className="cursor-blink">|</span>}
    </p>
  );
};

export default TypewriterText;