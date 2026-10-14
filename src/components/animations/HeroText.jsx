import React from 'react';
import { motion } from 'framer-motion';
import DurgaEyes from './DurgaEyes';

const HeroText = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-start z-10 w-full pt-6 sm:pt-0 sm:top-10 pointer-events-none">
      {/* JAI Text */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0 }}
        className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-red-600 tracking-widest drop-shadow-lg relative z-20"
      >
        JAI
      </motion.h1>

      <div className="h-56 md:h-64 w-full relative flex items-center justify-center z-0 -my-8">
        <DurgaEyes />
      </div>

      {/* BHAVANI Text */}
      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-t from-red-600 to-orange-500 tracking-widest drop-shadow-lg relative z-20"
      >
        BHAVANI
      </motion.h1>

      {/* Diagnostics Subtext */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className="text-lg md:text-2xl font-bold tracking-[0.4em] text-gray-800 mt-0 relative z-20"
      >
        DIAGNOSTICS
      </motion.h2>

      {/* Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2.0 }}
        className="mt-8 text-center bg-white/80 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm border border-gray-100"
      >
        <p className="text-xl md:text-2xl text-gray-800 font-bold tracking-wide">
          Prevention is better than cure
        </p>
        <p className="mt-1 text-sm md:text-base text-red-600 font-semibold tracking-widest uppercase">
          Find it and prevent before it's too late
        </p>
      </motion.div>
    </div>
  );
};

export default HeroText;
