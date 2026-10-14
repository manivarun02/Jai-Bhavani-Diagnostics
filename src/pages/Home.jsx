import React, { useState, useEffect } from 'react';
import HeroText from '../components/animations/HeroText';
import SyringeAnimation from '../components/animations/SyringeAnimation';
import SlideAnimation from '../components/animations/SlideAnimation';
import MicroscopeStation from '../components/animations/MicroscopeStation';
import LabReport from '../components/animations/LabReport';
import TrustStrip from '../components/sections/TrustStrip';
import OurPromise from '../components/sections/OurPromise';
import MeetFounder from '../components/sections/MeetFounder';
import SampleCollection from '../components/sections/SampleCollection';
import TestsAndPrices from '../components/sections/TestsAndPrices';
import Services from '../components/sections/Services';
import PopularTests from '../components/sections/PopularTests';
import WhyTrust from '../components/sections/WhyTrust';
import PreventionBanner from '../components/sections/PreventionBanner';
import EcoSection from '../components/sections/EcoSection';
import EnquiryForm from '../components/sections/EnquiryForm';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';
import FloatingActionButton from '../components/FloatingActionButton';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PHASES = ['fill', 'empty', 'drop', 'slide', 'focus', 'report', 'reset'];

export default function Home() {
  const [phase, setPhase] = useState('fill');

  useEffect(() => {
    let alive = true;
    const run = async () => {
      while (alive) {
        setPhase('fill'); await sleep(3000);
        if (!alive) break;
        setPhase('empty'); await sleep(2500);
        if (!alive) break;
        setPhase('drop'); await sleep(900);
        if (!alive) break;
        setPhase('slide'); await sleep(2800);
        if (!alive) break;
        setPhase('focus'); await sleep(1500);
        if (!alive) break;
        setPhase('report'); await sleep(5000);
        if (!alive) break;
        setPhase('reset'); await sleep(600);
      }
    };
    run();
    return () => { alive = false; };
  }, []);

  return (
    <>
    <div className="animation-root flex-grow relative bg-white w-full min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px]" />
      </div>

      {/* Center hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-6 pointer-events-none z-10">
        <HeroText />
      </div>

      {/* Animations */}
      <SyringeAnimation phase={phase} />
      <SlideAnimation phase={phase} />
      <MicroscopeStation phase={phase} />
      <LabReport phase={phase} />
    </div>
      <TrustStrip />
      <OurPromise />
      <MeetFounder />
      <SampleCollection />
      <TestsAndPrices />
      <Services />
      <PopularTests />
      <WhyTrust />
      <PreventionBanner />
      <EcoSection />
      <EnquiryForm />
      <ContactSection />
      <Footer />
      <FloatingActionButton />
    </>
  );
}
