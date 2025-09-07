import React from 'react';

interface SpeakerIconProps {
  isSpeaking: boolean;
}

const SpeakerIcon: React.FC<SpeakerIconProps> = ({ isSpeaking }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className={`transition-opacity duration-300 ${isSpeaking ? 'opacity-100 animate-wave-1' : 'opacity-0'}`}></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className={`transition-opacity duration-300 ${isSpeaking ? 'opacity-100 animate-wave-2' : 'opacity-0'}`}></path>
  </svg>
);

export default SpeakerIcon;
