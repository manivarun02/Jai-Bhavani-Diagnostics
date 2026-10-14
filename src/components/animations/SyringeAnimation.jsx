import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyringeAnimation({ phase }) {
  const [dropY, setDropY] = useState(456);
  const [dropX, setDropX] = useState(-14);

  useEffect(() => {
    const calc = () => {
      const pageH = document.querySelector('.animation-root')?.offsetHeight
        || (window.innerHeight - 64);
      const slideCY = pageH - 112 - 12;
      setDropY(slideCY - 80 - 189 + 170);   // +170 so drop lands exactly on slide
      setDropX(-14);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const filling = phase === 'fill';
  const emptying = ['empty', 'drop'].includes(phase);
  const showDrop = phase === 'drop';

  const y0 = 189;
  const yMid = y0 + (dropY - y0) * 0.5;

  return (
    <div className="absolute hidden sm:block z-20" style={{ top: 80, right: 64, width: 64 }}>
      <div className="relative" style={{ width: 64, height: 224 }}>

        {/* ── Plunger cap + rod + stopper (moves up while filling) ── */}
        <motion.div
          animate={{ y: filling ? -52 : 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="absolute"
          style={{ top: 0, left: 0, width: 64 }}
        >
          {/* Cap flat top */}
          <div
            className="bg-gray-300 border border-gray-400 rounded-sm"
            style={{ width: 40, height: 12, marginLeft: 12 }}
          />

          {/* Plunger rod */}
          <motion.div
            animate={{ height: emptying ? 55 : filling ? 66 : 14 }}
            transition={{ duration: emptying ? 2.0 : 2.5, ease: 'easeInOut' }}
            className="bg-gray-300 border border-gray-400"
            style={{ width: 12, marginLeft: 26 }}
          />

          {/* Plunger stopper (rubber tip inside barrel) */}
          <div
            className="bg-red-400 border border-red-600 rounded-sm"
            style={{ width: 36, height: 8, marginLeft: 14 }}
          />
        </motion.div>

        {/* ── Barrel ── */}
        <div
          className="absolute overflow-hidden bg-white/70 border-2 border-gray-300 rounded-sm shadow-md"
          style={{ top: 16, left: 12, width: 40, height: 128 }}
        >
          {[20, 38, 56, 74, 92, 110].map(b => (
            <div key={b} className="absolute left-0 bg-gray-400 opacity-40"
              style={{ bottom: b, width: 10, height: 1 }} />
          ))}

          <motion.div
            animate={{ height: filling ? '85%' : '0%' }}
            transition={{ duration: filling ? 2.5 : 2.0, ease: 'easeInOut' }}
            className="absolute bottom-0 w-full bg-red-600"
          />
        </div>

        {/* ── Needle hub ── */}
        <div className="absolute bg-gray-300 border border-gray-400"
          style={{ top: 144, left: 24, width: 16, height: 20 }} />

        {/* ── Needle ── */}
        <div className="absolute bg-gray-500"
          style={{ top: 164, left: 31, width: 2, height: 25 }} />

        {/* ── Realistic Arm & Nurse Hand (Reference Image 4) ── */}
        <AnimatePresence>
          {filling && (
            <motion.div
              key="arm"
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 260, opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute pointer-events-none"
              style={{
                top: 172,
                left: -108,
                width: 320,
                height: 140,
                zIndex: 30,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.16))',
              }}
            >
              <svg width="320" height="140" viewBox="0 0 320 140" fill="none">
                <defs>
                  <linearGradient id="armSkinGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fde0c8" />
                    <stop offset="25%" stopColor="#f8c9a3" />
                    <stop offset="60%" stopColor="#e8a87c" />
                    <stop offset="85%" stopColor="#cf8455" />
                    <stop offset="100%" stopColor="#b46d42" />
                  </linearGradient>

                  <radialGradient id="armHighlight2" cx="45%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#fff5ee" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#f8c9a3" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="tourniquetGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="35%" stopColor="#0284c7" />
                    <stop offset="80%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#075985" />
                  </linearGradient>

                  <linearGradient id="nurseSkinGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>

                  <filter id="veinBlur2" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" />
                  </filter>
                </defs>

                {/* Patient's Forearm & Inner Elbow (Image 4) */}
                <path
                  d="M0,115 C55,118 130,122 210,125 C260,126 300,124 320,122 L320,138 L0,138 Z"
                  fill="#000"
                  opacity="0.07"
                />
                <path
                  d="M0,48 C40,44 85,42 140,45 C180,48 230,58 320,68 L320,122 C245,122 170,120 100,116 C50,113 18,110 0,108 Z"
                  fill="url(#armSkinGrad2)"
                />
                <path
                  d="M0,48 C40,44 85,42 140,45 C180,48 230,58 320,68 L320,82 C230,74 180,64 140,62 C85,59 40,61 0,65 Z"
                  fill="url(#armHighlight2)"
                />

                {/* Inner elbow crease */}
                <path d="M70,60 C75,72 77,84 73,96" stroke="#b46d42" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
                <path d="M78,66 C83,75 84,85 81,92" stroke="#fed7aa" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

                {/* Superficial Veins (Median Cubital Vein - Image 4) */}
                <g filter="url(#veinBlur2)">
                  <path d="M25,78 C55,76 90,74 135,66 C165,60 190,58 220,57" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
                  <path d="M80,75 C105,78 130,83 155,88" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" />
                </g>
                <path d="M30,77 C60,75 95,73 135,65 C165,59 190,57 220,56" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                {/* Blue Tourniquet Strap (wrapped around arm on left - Image 4) */}
                <g>
                  <path d="M10,40 L34,38 L38,114 L14,116 Z" fill="#000" opacity="0.16" />
                  <path d="M8,42 C16,40 25,39 32,40 L36,112 C28,113 19,114 12,112 Z" fill="url(#tourniquetGrad2)" />
                  <path d="M9,43 L31,41" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
                  <path d="M11,44 L15,111" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
                  <path d="M29,42 L33,111" stroke="#0369a1" strokeWidth="1.5" opacity="0.8" />
                  <rect x="15" y="64" width="14" height="20" rx="3" fill="#0284c7" stroke="#075985" strokeWidth="1.5" />
                  <rect x="18" y="68" width="8" height="11" rx="1.5" fill="#f8fafc" />
                </g>

                {/* Nurse Gloved Fingers holding syringe hub (Image 4) */}
                <g id="nurseFingers2">
                  <path
                    d="M170,18 C163,25 155,35 149,47 C145,55 142,63 147,67 C152,71 159,67 163,60 C169,50 179,38 190,31 Z"
                    fill="url(#nurseSkinGrad2)"
                    stroke="#ca8a04"
                    strokeWidth="1.5"
                  />
                  <path d="M157,41 C161,44 165,47 168,46" stroke="#a16207" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  <path d="M151,51 C155,53 159,55 161,54" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

                  <path
                    d="M125,34 C122,42 120,50 123,56 C126,62 134,62 138,57 C142,51 143,42 141,32 Z"
                    fill="url(#nurseSkinGrad2)"
                    stroke="#ca8a04"
                    strokeWidth="1.5"
                  />
                  <path d="M126,40 C125,46 126,52 128,55" stroke="#fef9c3" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                </g>

                {/* Puncture site at vein directly under needle tip (140, 62) */}
                <circle cx="140" cy="62" r="3" fill="#dc2626" opacity="0.9" />
                <circle cx="140" cy="62" r="6" fill="#ef4444" opacity="0.3" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Blood drop ── */}
        <AnimatePresence>
          {showDrop && (
            <motion.div
              key="drop"
              initial={{ y: y0, x: 0, width: 10, height: 14, opacity: 1 }}
              animate={{
                y: [y0, yMid, dropY, dropY, dropY],
                x: [0, dropX * 0.4, dropX, dropX, dropX],
                width: [10, 10, 10, 22, 22],
                height: [14, 14, 14, 5, 5],
                opacity: [1, 1, 1, 1, 0],
                borderRadius: [
                  '50% 50% 50% 50% / 30% 30% 70% 70%',
                  '50% 50% 50% 50% / 30% 30% 70% 70%',
                  '50% 50% 50% 50% / 30% 30% 70% 70%',
                  '50%',
                  '50%',
                ],
              }}
              transition={{ duration: 0.85, times: [0, 0.40, 0.75, 0.90, 1], ease: 'easeIn' }}
              className="absolute bg-red-600"
              style={{
                left: 28, top: 0,
                boxShadow: '0 2px 6px rgba(220,38,38,0.5)',
              }}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}