import React from 'react';
import { motion } from 'framer-motion';

const DurgaEyes = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
      className="relative z-0 pointer-events-none"
    >
      <div className="relative w-[300px] h-[250px] flex flex-col items-center justify-center">
        
        {/* Trishul (Trident) and Moon */}
        <div className="absolute top-[0px] w-full flex flex-col items-center">
          <svg width="60" height="80" viewBox="0 0 60 80">
            {/* Center Spear */}
            <path d="M 30,10 L 33,30 L 27,30 Z" fill="#000" />
            <path d="M 28,30 L 32,30 L 32,70 L 28,70 Z" fill="#000" />
            {/* Left Curve */}
            <path d="M 30,35 Q 10,35 10,20 Q 15,30 25,35" fill="#000" />
            <path d="M 10,20 L 15,25 L 8,25 Z" fill="#000" />
            {/* Right Curve */}
            <path d="M 30,35 Q 50,35 50,20 Q 45,30 35,35" fill="#000" />
            <path d="M 50,20 L 45,25 L 52,25 Z" fill="#000" />
            {/* Horizontal band */}
            <rect x="22" y="50" width="16" height="4" fill="#000" rx="2" />
            {/* Crescent Moon */}
            <path d="M 20,75 Q 30,85 40,75 Q 30,80 20,75 Z" fill="#000" />
          </svg>
        </div>

        {/* Bindi */}
        <div className="absolute top-[85px]">
          <div className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-sm"></div>
        </div>

        {/* Eyes (Blinking) */}
        <div className="absolute top-[100px] w-full flex justify-center gap-2">
          {/* Left Eye */}
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5, delay: 2.5 }}
            style={{ transformOrigin: 'center 20px' }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60">
              {/* Upper sweeping curve */}
              <path d="M 5,30 Q 50,-10 115,35 Q 80,10 5,30" fill="#000" />
              {/* Lower curve */}
              <path d="M 15,32 Q 50,55 95,37 Q 60,45 15,32" fill="#000" />
              {/* Iris/Pupil */}
              <g>
                <circle cx="55" cy="30" r="14" fill="#000" />
                <circle cx="55" cy="30" r="10" fill="#333" />
                {/* White highlight */}
                <path d="M 48,25 Q 55,20 62,25 Q 55,28 48,25 Z" fill="#fff" opacity="0.9" />
                <circle cx="58" cy="33" r="2" fill="#fff" opacity="0.8" />
              </g>
            </svg>
          </motion.div>

          {/* Right Eye (Mirrored visually, but drawn directly to control highlight) */}
          <motion.div 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5, delay: 2.5 }}
            style={{ transformOrigin: 'center 20px' }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60">
              <path d="M 115,30 Q 70,-10 5,35 Q 40,10 115,30" fill="#000" />
              <path d="M 105,32 Q 70,55 25,37 Q 60,45 105,32" fill="#000" />
              <g>
                <circle cx="65" cy="30" r="14" fill="#000" />
                <circle cx="65" cy="30" r="10" fill="#333" />
                {/* Highlight matched to light direction */}
                <path d="M 58,25 Q 65,20 72,25 Q 65,28 58,25 Z" fill="#fff" opacity="0.9" />
                <circle cx="68" cy="33" r="2" fill="#fff" opacity="0.8" />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Nose and Nath (Nose Ring) */}
        <div className="absolute top-[135px] flex flex-col items-center ml-2">
          <svg width="80" height="60" viewBox="0 0 80 60">
            {/* Nose outline */}
            <path d="M 35,0 Q 30,20 25,35 Q 20,40 25,45 Q 30,45 35,40" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 35,40 Q 40,42 45,40 Q 50,38 52,32" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            
            {/* Nose Ring (Nath) */}
            <circle cx="52" cy="36" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
            {/* Jewel on Nath */}
            <circle cx="64" cy="36" r="2.5" fill="#000" />
          </svg>
        </div>

      </div>
    </motion.div>
  );
};

export default DurgaEyes;
