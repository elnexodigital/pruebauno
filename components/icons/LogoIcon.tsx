import React from 'react';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
    <text 
      x="50" 
      y="55" 
      fontFamily="Brittany Signature, cursive" 
      fontSize="40" 
      fill="white" 
      textAnchor="middle"
      dy=".3em"
    >
      N
    </text>
  </svg>
);

export default LogoIcon;
