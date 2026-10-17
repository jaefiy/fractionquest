import React from 'react';

export type FinoExpression = 'welcoming' | 'encouraging' | 'thinking' | 'excited' | 'waving';

interface FinoMascotProps {
  expression?: FinoExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FinoMascot: React.FC<FinoMascotProps> = ({
  expression = 'welcoming',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
  }[size];

  return (
    <div className={`relative inline-block fino-living ${sizeClasses} ${className}`} aria-label={`Fino the Fox (${expression})`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="60" ry="10" fill="#CBD5E1" opacity="0.5" />

        {/* Fluffy Tail */}
        <g id="tail" className={expression === 'excited' ? 'animate-bounce' : ''}>
          <path
            d="M 130 130 C 180 130 195 80 170 50 C 150 70 140 100 120 115 Z"
            fill="#FF7A38"
          />
          {/* Tail White Tip */}
          <path
            d="M 170 50 C 180 60 185 70 175 80 C 165 80 158 72 170 50 Z"
            fill="#FFF8E7"
          />
        </g>

        {/* Body */}
        <ellipse cx="100" cy="140" rx="45" ry="40" fill="#FF7A38" />
        {/* Chest Fur */}
        <ellipse cx="100" cy="145" rx="28" ry="26" fill="#FFF8E7" />

        {/* Ears Outer */}
        <path d="M 50 70 L 65 20 L 90 60 Z" fill="#E05B18" />
        <path d="M 150 70 L 135 20 L 110 60 Z" fill="#E05B18" />
        {/* Ears Inner */}
        <path d="M 57 65 L 67 30 L 83 58 Z" fill="#FFC0AD" />
        <path d="M 143 65 L 133 30 L 117 58 Z" fill="#FFC0AD" />

        {/* Head */}
        <path
          d="M 50 90 Q 30 110 50 120 Q 100 135 150 120 Q 170 110 150 90 Q 100 65 50 90 Z"
          fill="#FF7A38"
        />

        {/* White Cheeks/Muzzle */}
        <path
          d="M 50 110 Q 75 130 100 125 Q 125 130 150 110 Q 130 90 100 102 Q 70 90 50 110 Z"
          fill="#FFF8E7"
        />

        {/* Teal Explorer Scarf */}
        <g id="scarf">
          {/* Main Scarf Wrap */}
          <path
            d="M 60 120 Q 100 138 140 120 Q 145 132 135 138 Q 100 150 65 138 Q 55 132 60 120 Z"
            fill="#20B2AA"
          />
          {/* Scarf Tail / Knot */}
          <path
            d="M 120 130 L 135 170 L 115 172 L 110 133 Z"
            fill="#14857E"
          />
          {/* Explorer Gold Badge on Scarf */}
          <circle cx="115" cy="133" r="7" fill="#FFC83B" />
          <path d="M 115 128 L 117 132 L 121 133 L 118 135 L 119 139 L 115 137 L 111 139 L 112 135 L 109 133 L 113 132 Z" fill="#FFF" />
        </g>

        {/* Eyes & Expressions */}
        <g id="eyes">
          {expression === 'thinking' ? (
            <>
              {/* Thinking Eyes (looking up-right) */}
              <circle cx="80" cy="90" r="7" fill="#334155" />
              <circle cx="120" cy="88" r="7" fill="#334155" />
              <circle cx="82" cy="88" r="2.5" fill="#FFF" />
              <circle cx="122" cy="86" r="2.5" fill="#FFF" />
              {/* Eyebrow raised */}
              <path d="M 72 80 Q 80 75 88 80" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 112 75 Q 120 70 128 77" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : expression === 'excited' ? (
            <>
              {/* Starry Excited Eyes */}
              <circle cx="80" cy="92" r="8" fill="#334155" />
              <circle cx="120" cy="92" r="8" fill="#334155" />
              <circle cx="78" cy="89" r="3" fill="#FFF" />
              <circle cx="118" cy="89" r="3" fill="#FFF" />
              <circle cx="82" cy="94" r="1.5" fill="#FFF" />
              <circle cx="122" cy="94" r="1.5" fill="#FFF" />
              {/* Happy Eyebrows */}
              <path d="M 72 82 Q 80 76 88 82" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 112 82 Q 120 76 128 82" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Welcoming / Encouraging Standard Eyes */}
              <circle cx="80" cy="92" r="7" fill="#334155" />
              <circle cx="120" cy="92" r="7" fill="#334155" />
              <circle cx="78" cy="89" r="2.5" fill="#FFF" />
              <circle cx="118" cy="89" r="2.5" fill="#FFF" />
              <path d="M 73 83 Q 80 79 87 83" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 113 83 Q 120 79 127 83" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}
        </g>

        {/* Cute Nose */}
        <polygon points="100,100 93,107 107,107" fill="#1E293B" rx="2" />
        <ellipse cx="98" cy="102" rx="2" ry="1" fill="#FFF" opacity="0.6" />

        {/* Mouth */}
        <g id="mouth">
          {expression === 'excited' ? (
            <path d="M 90 108 Q 100 122 110 108 Z" fill="#E05B18" stroke="#334155" strokeWidth="2" />
          ) : expression === 'thinking' ? (
            <path d="M 93 112 Q 100 108 107 112" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M 90 108 Q 95 114 100 108 Q 105 114 110 108" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* Blush Cheeks */}
        <ellipse cx="65" cy="103" rx="8" ry="5" fill="#FF886B" opacity="0.4" />
        <ellipse cx="135" cy="103" rx="8" ry="5" fill="#FF886B" opacity="0.4" />

        {/* Paws / Hands */}
        <g id="paws">
          {expression === 'waving' ? (
            <>
              <ellipse cx="65" cy="138" rx="10" ry="8" fill="#FF7A38" />
              {/* Raised Waving Hand */}
              <g className="animate-bounce">
                <ellipse cx="148" cy="100" rx="10" ry="10" fill="#FF7A38" />
                <ellipse cx="148" cy="100" rx="6" ry="6" fill="#FFF8E7" />
              </g>
            </>
          ) : expression === 'thinking' ? (
            <>
              {/* Hand on chin */}
              <ellipse cx="65" cy="138" rx="10" ry="8" fill="#FF7A38" />
              <ellipse cx="108" cy="116" rx="9" ry="8" fill="#FF7A38" />
            </>
          ) : (
            <>
              {/* Paws resting nicely */}
              <ellipse cx="68" cy="138" rx="10" ry="8" fill="#FF7A38" />
              <ellipse cx="132" cy="138" rx="10" ry="8" fill="#FF7A38" />
              <ellipse cx="68" cy="138" rx="6" ry="5" fill="#FFF8E7" />
              <ellipse cx="132" cy="138" rx="6" ry="5" fill="#FFF8E7" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
