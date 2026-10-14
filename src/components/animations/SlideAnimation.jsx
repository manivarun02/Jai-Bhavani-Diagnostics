// SlideAnimation.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SW = 90;
const SH = 24;
const SLIDE_RIGHT = 64;
const STAGE_CX = 150; // ← fixed: microscope stage centre X (was 87, caused overflow)
const SLIDE_BOTTOM = 112;

export default function SlideAnimation({ phase }) {
  const [travel, setTravel] = useState(-900);
  const [bloodOnSlide, setBloodOnSlide] = useState(false);

  useEffect(() => {
    let timer;
    if (phase === 'reset' || phase === 'fill' || phase === 'empty') {
      setBloodOnSlide(false);
    } else if (phase === 'drop') {
      // Only display red dot AFTER the drop reaches the slide
      timer = setTimeout(() => {
        setBloodOnSlide(true);
      }, 640);
    } else if (['slide', 'focus', 'report'].includes(phase)) {
      setBloodOnSlide(true);
    }
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const calc = () => {
      const slideCX = window.innerWidth - SLIDE_RIGHT - SW / 2;
      setTravel(-(slideCX - STAGE_CX));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const hidden = phase === 'reset';
  const moved = ['slide', 'focus', 'report'].includes(phase);

  return (
    <div
      className="absolute hidden sm:block z-20"
      style={{
        bottom: SLIDE_BOTTOM,
        right: SLIDE_RIGHT,
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <motion.div
        animate={{ x: moved ? travel : 0 }}
        transition={{ duration: moved ? 2.4 : 0, ease: 'easeInOut' }}
      >
        {/* Glass slide */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: SW, height: SH,
            border: '2px solid #9ca3af',
            borderRadius: 3,
            background: 'rgba(186,230,253,0.88)',
            boxShadow: '0 3px 12px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 7,
            borderRadius: '3px 3px 0 0',
            background: 'rgba(255,255,255,0.5)',
          }} />
          <motion.div
            animate={{ scale: bloodOnSlide ? 1 : 0, opacity: bloodOnSlide ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              width: 18, height: 8,
              background: 'radial-gradient(ellipse, #ef4444, #991b1b)',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(220,38,38,0.55)',
            }}
          />
        </div>
        <div style={{
          textAlign: 'center', fontSize: 6,
          color: '#9ca3af', letterSpacing: '0.12em',
          marginTop: 2, fontFamily: 'monospace',
        }}>
          BLOOD SAMPLE
        </div>
      </motion.div>
    </div>
  );
}