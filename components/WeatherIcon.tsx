import React from 'react';

interface WeatherIconProps {
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ description }) => {
  const desc = description.toLowerCase();

  // Sunny / Clear
  if (desc.includes('sol') || desc.includes('despejado') || desc.includes('claro')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    );
  }

  // Partly Cloudy
  if (desc.includes('parcialmente nublado') || desc.includes('algo nublado') || desc.includes('nubes y sol')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        <path d="M22 10a4.5 4.5 0 0 0-8.25-2.06 6 6 0 0 0-9.69 5.34"></path>
      </svg>
    );
  }

  // Cloudy
  if (desc.includes('nublado') || desc.includes('cubierto') || desc.includes('nubes')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    );
  }

  // Rain / Drizzle / Showers
  if (desc.includes('lluvia') || desc.includes('llovizna') || desc.includes('chubasco') || desc.includes('aguacero')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        <line x1="8" y1="19" x2="8" y2="21"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="16" y1="19" x2="16" y2="21"></line>
      </svg>
    );
  }
  
  // Thunderstorm
  if (desc.includes('tormenta')) {
      return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16.92A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
            <polyline points="8 12 12 15 11 22"></polyline>
          </svg>
      )
  }

  // Mist / Fog
  if (desc.includes('niebla') || desc.includes('neblina') || desc.includes('bruma')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10a4.5 4.5 0 0 0-8.25-2.06 6 6 0 0 0-9.69 5.34"></path>
            <line x1="2" y1="16" x2="22" y2="16"></line>
            <line x1="3" y1="20" x2="21" y2="20"></line>
        </svg>
      )
  }

  // Default icon (generic atmosphere)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
  );
};

export default WeatherIcon;