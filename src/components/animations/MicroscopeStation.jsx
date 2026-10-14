import React from 'react';
import { motion } from 'framer-motion';

// Microscope: bottom=12px, left=32px
// SVG 160×260. Stage rect at SVG y=154.
// Absolute content y of stage = (650-12-260)+154 = 378+154 = 532px ≈ 536px ✓

export default function MicroscopeStation({ phase }) {
  const focusing = ['focus', 'report'].includes(phase);
  const glowing  = phase === 'focus';

  return (
    <div className="absolute hidden sm:block z-10" style={{ bottom: 75, left: 20 }}>
      <svg width="160" height="260" viewBox="0 0 160 260">

        {/* BASE */}
        <rect x="10" y="228" width="140" height="24" rx="6" fill="#1e293b" />
        <rect x="20" y="218" width="30"  height="14" rx="3" fill="#334155" />
        <rect x="88" y="218" width="42"  height="14" rx="3" fill="#334155" />

        {/* PILLAR */}
        <rect x="28" y="75" width="22" height="147" rx="4" fill="#0f172a" />
        <rect x="31" y="80" width="5"  height="135" rx="2" fill="#334155" opacity="0.35" />

        {/* ARM */}
        <rect x="28" y="75" width="82" height="18" rx="6" fill="#1e293b" />

        {/* COARSE KNOB */}
        <ellipse cx="28" cy="150" rx="11" ry="13" fill="#475569" />
        <ellipse cx="28" cy="150" rx="7"  ry="9"  fill="#64748b" />

        {/* FINE KNOB */}
        <ellipse cx="28" cy="173" rx="8" ry="10" fill="#475569" />
        <ellipse cx="28" cy="173" rx="5" ry="7"  fill="#64748b" />

        {/* STAGE — extended to right so slide docks into it */}
        <rect x="22" y="154" width="130" height="8" rx="2" fill="#0f172a" />
        <rect x="36" y="150" width="116" height="12" rx="2" fill="#1e293b" />
        {/* Slot indicator lines */}
        <line x1="100" y1="150" x2="100" y2="162" stroke="#475569" strokeWidth="1" />
        <line x1="130" y1="150" x2="130" y2="162" stroke="#475569" strokeWidth="1" />

        {/* Blue test aperture */}
        <ellipse cx="67" cy="156" rx="13" ry="5" fill="#1d4ed8" opacity="0.75" />

        {/* CONDENSER */}
        <rect x="60" y="166" width="16" height="12" rx="2" fill="#334155" />
        <rect x="62" y="178" width="12" height="8"  rx="1" fill="#475569" />

        {/* TUBE BODY */}
        <rect x="90" y="22" width="24" height="65" rx="4" fill="#1e293b" />

        {/* EYEPIECE */}
        <rect x="85" y="10" width="34" height="16" rx="6" fill="#0f172a" />
        <ellipse cx="102" cy="10" rx="11" ry="5" fill="#1e293b" />
        <ellipse cx="102" cy="6"  rx="8"  ry="3" fill="#334155" />

        {/* NOSEPIECE */}
        <ellipse cx="102" cy="91" rx="23" ry="10" fill="#1e293b" />

        {/* OBJECTIVE LENSES — move down on focus */}
        <motion.g
          animate={{ translateY: focusing ? 10 : 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          <rect x="95" y="97"  width="11" height="30" rx="3" fill="#475569" />
          <rect x="96" y="125" width="9"  height="6"  rx="1" fill="#64748b" />
          <rect x="78" y="93"  width="11" height="50" rx="3" fill="#94a3b8" />
          <rect x="79" y="141" width="9"  height="9"  rx="2" fill="#cbd5e1" />
          <ellipse cx="84" cy="150" rx="4" ry="2" fill="#e2e8f0" />
          <rect x="111" y="95" width="10" height="38" rx="3" fill="#475569" />
        </motion.g>

        {/* LIGHT BEAM on focus */}
        <motion.polygon
          animate={{ opacity: glowing ? 0.5 : 0 }}
          transition={{ duration: 0.6 }}
          points="56,154 80,154 88,178 48,178"
          fill="url(#lb)"
        />

        {/* SCAN GLOW on stage */}
        <motion.ellipse
          animate={{ opacity: focusing ? 0.85 : 0, ry: focusing ? 6 : 3 }}
          transition={{ duration: 0.5 }}
          cx="67" cy="156" rx="15" fill="#3b82f6"
          style={{ filter: 'blur(2px)' }}
        />

        <defs>
          <linearGradient id="lb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0"   />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
