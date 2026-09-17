import React from 'react';

interface BSLogoProps {
  customLogoUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BSLogo: React.FC<BSLogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  if (customLogoUrl) {
    return (
      <div className={`relative flex items-center gap-2.5 ${className}`}>
        <img
          src={customLogoUrl}
          alt="BS Websites Logo"
          className={`${sizeMap[size]} object-contain rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-500/30 bg-[#070b14]`}
        />
        {showText && (
          <div className="flex flex-col">
            <span className="font-black tracking-tight text-white leading-none text-lg">BS Websites</span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider">DEV • DESIGN • SALES</span>
          </div>
        )}
      </div>
    );
  }

  // Default Fallback Cyber Neon Circuit Logo (inspired by BS Websites official circuit brand visual)
  return (
    <div className={`relative flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeMap[size]} flex-shrink-0 rounded-xl bg-gradient-to-br from-[#060b14] via-[#091424] to-[#040810] border border-cyan-500/50 p-1 shadow-lg shadow-cyan-500/25 overflow-hidden flex items-center justify-center group`}>
        {/* Glowing Circuit background lines */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-cyan-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cyberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00c6ff" />
            </linearGradient>
            <filter id="neonPulse" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circuit Grid background */}
          <path d="M5 20 H30 V45 H10" stroke="#00f2fe" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M95 20 H70 V35 H90" stroke="#00f2fe" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M15 85 H40 V65 H25" stroke="#00f2fe" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M85 85 H60 V55 H75" stroke="#00f2fe" strokeWidth="1" strokeOpacity="0.3" />
          
          {/* Circuit nodes */}
          <circle cx="30" cy="45" r="2" fill="#00f2fe" />
          <circle cx="70" cy="35" r="2" fill="#00f2fe" />
          <circle cx="40" cy="65" r="2" fill="#00f2fe" />
          <circle cx="60" cy="55" r="2" fill="#00f2fe" />

          {/* High Tech "BS" Monogram */}
          {/* Letter B */}
          <path
            d="M 24 25 L 44 25 C 50 25 54 28 54 34 C 54 39 50 42 44 43 C 52 44 56 48 56 55 C 56 62 50 67 43 67 L 24 67 Z M 32 33 L 32 42 L 42 42 C 45 42 47 40 47 37 C 47 34 45 33 42 33 Z M 32 50 L 32 59 L 43 59 C 46 59 48 57 48 54.5 C 48 52 46 50 43 50 Z"
            fill="url(#cyberGlow)"
            filter="url(#neonPulse)"
          />

          {/* Letter S (Interlocking Circuit) */}
          <path
            d="M 76 34 C 74 28 68 25 61 25 C 52 25 47 30 47 37 C 47 44 52 47 59 50 C 66 53 69 55 69 59 C 69 63 65 66 59 66 C 52 66 47 62 45 56 L 39 60 C 42 68 49 73 60 73 C 69 73 76 67 76 58 C 76 50 71 46 63 43 C 56 40 54 38 54 35 C 54 32 57 30 61 30 C 65 30 69 32 71 36 Z"
            fill="url(#cyberGlow)"
            filter="url(#neonPulse)"
          />

          {/* Circuit core tech trace through B and S */}
          <path d="M 20 46 L 80 46" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />
          <circle cx="50" cy="46" r="2.5" fill="#ffffff" />
        </svg>

        {/* Outer neon sweep overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-white/10 pointer-events-none rounded-xl"></div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-black tracking-tight text-white leading-none text-lg">BS Websites</span>
          <span className="text-[10px] text-cyan-400 font-mono tracking-wider">DEV • DESIGN • SALES</span>
        </div>
      )}
    </div>
  );
};
