import React, { useRef, useEffect, useState, useCallback } from 'react';

const REPORT_DATA = [
  { label: 'Hemoglobin',  value: '13.4 g/dL' },
  { label: 'WBC Count',   value: '6,800 /µL' },
  { label: 'RBC Count',   value: '4.8 M/µL'  },
  { label: 'Platelets',   value: '2.4 lakh/µL' },
  { label: 'Blood Group', value: 'O+ve'      },
  { label: 'Blood Sugar', value: '92 mg/dL'  },
];

export default function HeroOrchestrator({ heroRef }) {
  const [dims, setDims] = useState(null);

  // Animation states
  const [step, setStep] = useState(1);
  const [overallOpacity, setOverallOpacity] = useState(1);

  // Arm & Hand (Reference Image 4)
  const [armVisible, setArmVisible] = useState(true);
  const [armInPosition, setArmInPosition] = useState(false);

  // Syringe
  const [plungerPos, setPlungerPos] = useState(0); // 0 = rest, -45 = pulled back, 12 = pushed down
  const [bloodFillPct, setBloodFillPct] = useState(0); // 0 to 1

  // Slide & Drop
  const [slideVisible, setSlideVisible] = useState(false);
  const [dropState, setDropState] = useState('hidden'); // 'hidden' | 'forming' | 'falling'
  const [smearVisible, setSmearVisible] = useState(false);
  const [slideCurrentX, setSlideCurrentX] = useState(null);
  const [slideTraveling, setSlideTraveling] = useState(false);

  // Microscope (Reference Image 3)
  const [lensDown, setLensDown] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const [analyzingBadge, setAnalyzingBadge] = useState(false);

  // Report Card
  const [reportVisible, setReportVisible] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const [verifiedStamp, setVerifiedStamp] = useState(false);

  const aliveRef = useRef(true);
  const timeoutsRef = useRef([]);

  const safeSleep = useCallback((ms) => {
    return new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timeoutsRef.current.push(id);
    });
  }, []);

  // Measurement routine using DOM getBoundingClientRect & ResizeObserver
  const measure = useCallback(() => {
    if (!heroRef?.current) return;
    const heroRect = heroRef.current.getBoundingClientRect();
    const W = heroRect.width;
    const H = heroRect.height;
    if (W === 0 || H === 0) return;

    // Responsive scale
    const scale = Math.min(1, Math.max(0.68, W / 1024));

    const heroEl = heroRef.current;

    // Target the DIAGNOSTICS heading and the tagline pill
    const diagEl = heroEl.querySelector('h2');
    const tagPill = heroEl.querySelector('.rounded-full') ||
      Array.from(heroEl.querySelectorAll('p')).find(p =>
        p.textContent.includes('Prevention is better than cure')
      )?.closest('div');

    let gapY = H * 0.74; // safe default fallback

    if (diagEl) {
      const dRect = diagEl.getBoundingClientRect();
      const diagBottom = dRect.bottom - heroRect.top;

      if (tagPill) {
        const tRect = tagPill.getBoundingClientRect();
        const tagTop = tRect.top - heroRect.top;

        if (tagTop > diagBottom) {
          // Perfectly centered in the white space between DIAGNOSTICS and Tagline
          gapY = (diagBottom + tagTop) / 2;
        } else {
          // Fallback if tagline is still animating in: place 22px below DIAGNOSTICS
          gapY = diagBottom + 22;
        }
      } else {
        gapY = diagBottom + 22;
      }
    }

    // Microscope placement (Reference Image 3 & Green spot in latest ref):
    // SVG is 160 x 260. Stage surface slot sits at SVG y=152, testing aperture at x=80.
    const scopeW = 160 * scale;
    const scopeH = 260 * scale;
    const stageSvgX = 80 * scale;
    const stageSvgY = 152 * scale;

    // Position microscope vertically so stage surface sits EXACTLY at gapY
    const scopeTop = gapY - stageSvgY;
    const scopeLeft = Math.max(12, Math.min(60, W * 0.05));

    // Exact docking coordinate for the slide center directly under the objective lens (Green spot)
    const stageTargetX = scopeLeft + stageSvgX;
    const stageTargetY = gapY;

    // Syringe placement (right side of hero, positioned naturally above gapY)
    const syringeW = 54 * scale;
    const syringeH = 210 * scale;
    const syringeRight = Math.max(16, Math.min(70, W * 0.07));
    const syringeLeft = W - syringeRight - syringeW;

    // Needle tip relative to syringe top-left:
    const needleTipOffsetY = 176 * scale;

    // Place needle tip comfortably 110px above gapY so the arm fits right beneath it
    const dropDistance = 110 * scale;
    const needleTipY = gapY - dropDistance;
    const syringeTop = needleTipY - needleTipOffsetY;
    const needleTipX = syringeLeft + syringeW / 2;

    // Slide geometry (sleek 20px height for optimal clearance through the gap):
    const slideW = 86 * scale;
    const slideH = 20 * scale;

    // Slide start position: horizontally centered under needle tip, vertically centered on gapY
    const slideStartX = needleTipX - slideW / 2;
    const slideEndX = stageTargetX - slideW / 2;
    const slideY = gapY - slideH / 2;

    // Arm positioning (Reference Image 4):
    // Puncture site on arm SVG is at (140, 72)
    const armW = 340 * scale;
    const armH = 160 * scale;
    const armLeft = needleTipX - 140 * scale;
    const armTop = needleTipY - 72 * scale;

    setDims({
      W,
      H,
      scale,
      gapY,
      scopeW,
      scopeH,
      scopeTop,
      scopeLeft,
      stageTargetX,
      stageTargetY,
      syringeW,
      syringeH,
      syringeTop,
      syringeLeft,
      needleTipX,
      needleTipY,
      slideW,
      slideH,
      slideStartX,
      slideEndX,
      slideY,
      dropDistance,
      armW,
      armH,
      armLeft,
      armTop,
    });
  }, [heroRef]);

  // Initial measurement + ResizeObserver + settling timers for Framer Motion entrances
  useEffect(() => {
    measure();
    const el = heroRef?.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);

    // HeroText animations have delays at 0.8s and 2.0s; re-measure to lock settled positions
    const t1 = setTimeout(measure, 500);
    const t2 = setTimeout(measure, 1200);
    const t3 = setTimeout(measure, 2400);
    const t4 = setTimeout(measure, 3200);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [measure, heroRef]);

  // Unified Orchestrated Sequence Loop
  useEffect(() => {
    if (!dims) return;
    aliveRef.current = true;

    const run = async () => {
      while (aliveRef.current) {
        // Measure to capture settled DOM geometry
        measure();

        // ----------------------------------------------------
        // STEP 1: INITIAL STATE
        // Arm & hand in place under needle (Reference Image 4)
        // Syringe empty, slide HIDDEN, report hidden
        // ----------------------------------------------------
        setStep(1);
        setOverallOpacity(1);
        setArmVisible(true);
        setArmInPosition(false);
        setSlideVisible(false);
        setPlungerPos(0);
        setBloodFillPct(0);
        setDropState('hidden');
        setSmearVisible(false);
        setSlideTraveling(false);
        setSlideCurrentX(dims.slideStartX);
        setLensDown(false);
        setGlowActive(false);
        setAnalyzingBadge(false);
        setReportVisible(false);
        setRevealedLines(0);
        setVerifiedStamp(false);

        await safeSleep(200);
        if (!aliveRef.current) break;

        // Arm glides smoothly into position under the needle tip
        setArmInPosition(true);
        await safeSleep(650);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 2: REAL-TIME BLOOD COLLECTION FROM HAND/ARM
        // Needle is in the vein. Plunger pulls back, syringe fills with blood (2s)
        // ----------------------------------------------------
        setStep(2);
        setPlungerPos(-45);
        setBloodFillPct(0.85);
        await safeSleep(2100);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 3: HAND/ARM DISAPPEARS
        // After blood collection, arm smoothly slides out and disappears
        // ----------------------------------------------------
        setStep(3);
        setArmInPosition(false);
        await safeSleep(750);
        if (!aliveRef.current) break;
        setArmVisible(false);

        // ----------------------------------------------------
        // STEP 4: SLIDE APPEARS BELOW SYRINGE
        // Now that hand has disappeared, slide appears right below needle at gapY
        // ----------------------------------------------------
        measure();
        setStep(4);
        setSlideVisible(true);
        await safeSleep(450);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 5: BLOOD RELEASED & FALLS STRAIGHT ONTO SLIDE
        // Plunger pushed in, drop forms and falls straight down onto slide center
        // ----------------------------------------------------
        setStep(5);
        setPlungerPos(12);
        setBloodFillPct(0.55);
        setDropState('forming');
        await safeSleep(400);
        if (!aliveRef.current) break;

        setDropState('falling');
        await safeSleep(600);
        if (!aliveRef.current) break;

        // Drop lands on slide: creates blood smear
        setDropState('hidden');
        setSmearVisible(true);
        await safeSleep(400);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 6: SLIDE TRAVEL BETWEEN DIAGNOSTICS & TAGLINE PILL
        // Glides smoothly right to left along y = gapY
        // ----------------------------------------------------
        setStep(6);
        setSlideTraveling(true);
        setSlideCurrentX(dims.slideEndX);
        await safeSleep(2600);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 7: DOCKING AT MICROSCOPE STAGE (Image 3 Spot) & TESTING
        // Stops under lens over testing aperture, lens lowers to focus, blue glow (2s)
        // ----------------------------------------------------
        setStep(7);
        setLensDown(true);
        setGlowActive(true);
        setAnalyzingBadge(true);
        await safeSleep(2200);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 8: SAMPLE REPORT CARD
        // Appears top-left below navbar, lines fill one by one, verified tick
        // ----------------------------------------------------
        setStep(8);
        setAnalyzingBadge(false);
        setReportVisible(true);
        await safeSleep(400);
        if (!aliveRef.current) break;

        for (let i = 1; i <= REPORT_DATA.length; i++) {
          setRevealedLines(i);
          await safeSleep(380);
          if (!aliveRef.current) break;
        }

        await safeSleep(200);
        setVerifiedStamp(true);
        await safeSleep(600);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 9: HOLD (2.2 seconds)
        // ----------------------------------------------------
        setStep(9);
        await safeSleep(2200);
        if (!aliveRef.current) break;

        // ----------------------------------------------------
        // STEP 10: FADE OUT & LOOP
        // ----------------------------------------------------
        setStep(10);
        setOverallOpacity(0);
        await safeSleep(750);
        if (!aliveRef.current) break;

        await safeSleep(200);
      }
    };

    run();

    return () => {
      aliveRef.current = false;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [dims, safeSleep]);

  if (!dims) return null;

  const {
    scale,
    scopeW,
    scopeH,
    scopeTop,
    scopeLeft,
    syringeW,
    syringeH,
    syringeTop,
    syringeLeft,
    needleTipX,
    needleTipY,
    slideW,
    slideH,
    slideStartX,
    slideEndX,
    slideY,
    dropDistance,
    armW,
    armH,
    armLeft,
    armTop,
  } = dims;

  const currentSlideLeft = slideCurrentX !== null ? slideCurrentX : slideStartX;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-20"
      style={{
        opacity: overallOpacity,
        transition: step === 10 ? 'opacity 0.7s ease-out' : 'none',
      }}
    >
      {/* ==================================================== */}
      {/* 1. MICROSCOPE STATION (Reference Image 3)             */}
      {/* ==================================================== */}
      <div
        className="absolute"
        style={{
          top: scopeTop,
          left: scopeLeft,
          width: scopeW,
          height: scopeH,
        }}
      >
        <svg
          width={scopeW}
          height={scopeH}
          viewBox="0 0 160 260"
          style={{ overflow: 'visible' }}
        >
          {/* BASE */}
          <rect x="10" y="228" width="140" height="24" rx="6" fill="#1e293b" />
          <rect x="20" y="218" width="30" height="14" rx="3" fill="#334155" />
          <rect x="88" y="218" width="42" height="14" rx="3" fill="#334155" />

          {/* PILLAR */}
          <rect x="28" y="75" width="22" height="147" rx="4" fill="#0f172a" />
          <rect x="31" y="80" width="5" height="135" rx="2" fill="#334155" opacity="0.35" />

          {/* ARM */}
          <rect x="28" y="75" width="82" height="18" rx="6" fill="#1e293b" />

          {/* COARSE & FINE ADJUSTMENT KNOBS */}
          <ellipse cx="28" cy="150" rx="11" ry="13" fill="#475569" />
          <ellipse cx="28" cy="150" rx="7" ry="9" fill="#64748b" />
          <ellipse cx="28" cy="173" rx="8" ry="10" fill="#475569" />
          <ellipse cx="28" cy="173" rx="5" ry="7" fill="#64748b" />

          {/* STAGE (Slot where slide docks, surface at y=152) */}
          <rect x="22" y="154" width="130" height="8" rx="2" fill="#0f172a" />
          <rect x="36" y="150" width="116" height="12" rx="2" fill="#1e293b" />
          <line x1="100" y1="150" x2="100" y2="162" stroke="#475569" strokeWidth="1" />
          <line x1="130" y1="150" x2="130" y2="162" stroke="#475569" strokeWidth="1" />

          {/* Blue stage testing aperture (Centered at x=80, y=156 - Image 3 spot) */}
          <ellipse cx="80" cy="156" rx="14" ry="5" fill="#1d4ed8" opacity="0.8" />

          {/* Blue illumination glow during testing */}
          {glowActive && (
            <ellipse
              cx="80"
              cy="156"
              rx="18"
              ry="7"
              fill="#38bdf8"
              opacity="0.85"
              style={{ filter: 'blur(3px)' }}
            />
          )}

          {/* CONDENSER */}
          <rect x="72" y="166" width="16" height="12" rx="2" fill="#334155" />
          <rect x="74" y="178" width="12" height="8" rx="1" fill="#475569" />

          {/* TUBE BODY */}
          <rect x="86" y="22" width="24" height="65" rx="4" fill="#1e293b" />

          {/* EYEPIECE */}
          <rect x="81" y="10" width="34" height="16" rx="6" fill="#0f172a" />
          <ellipse cx="98" cy="10" rx="11" ry="5" fill="#1e293b" />
          <ellipse cx="98" cy="6" rx="8" ry="3" fill="#334155" />

          {/* NOSEPIECE */}
          <ellipse cx="98" cy="91" rx="23" ry="10" fill="#1e293b" />

          {/* OBJECTIVE LENSES (Centered directly over aperture at x=80, lowers on focus) */}
          <g
            style={{
              transform: `translateY(${lensDown ? '10px' : '0px'})`,
              transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <rect x="91" y="97" width="11" height="30" rx="3" fill="#475569" />
            <rect x="92" y="125" width="9" height="6" rx="1" fill="#64748b" />
            {/* Center active lens pointing down at x=80 */}
            <rect x="74" y="93" width="12" height="50" rx="3" fill="#94a3b8" />
            <rect x="75" y="141" width="10" height="9" rx="2" fill="#cbd5e1" />
            <ellipse cx="80" cy="150" rx="4" ry="2" fill="#e2e8f0" />
            <rect x="107" y="95" width="10" height="38" rx="3" fill="#475569" />
          </g>
        </svg>
      </div>

      {/* ==================================================== */}
      {/* 2. SYRINGE WIDGET                                    */}
      {/* ==================================================== */}
      <div
        className="absolute"
        style={{
          top: syringeTop,
          left: syringeLeft,
          width: syringeW,
          height: syringeH,
        }}
      >
        <div className="relative w-full h-full">
          {/* Plunger (Cap + Shaft + Rubber Stopper) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${plungerPos * scale}px)`,
              transition:
                step === 2
                  ? 'transform 2.0s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : step === 5
                  ? 'transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  : 'transform 0.4s ease',
            }}
          >
            <div
              className="bg-gray-300 border border-gray-400 rounded-sm shadow-sm"
              style={{
                width: 38 * scale,
                height: 10 * scale,
                marginLeft: 8 * scale,
              }}
            />
            <div
              className="bg-gray-300 border-x border-gray-400"
              style={{
                width: 10 * scale,
                height: 48 * scale,
                marginLeft: 22 * scale,
              }}
            />
            <div
              className="bg-red-900 border border-red-950 rounded-xs"
              style={{
                width: 32 * scale,
                height: 8 * scale,
                marginLeft: 11 * scale,
              }}
            />
          </div>

          {/* Syringe Barrel */}
          <div
            className="absolute overflow-hidden bg-white/80 border-2 border-gray-300 rounded-sm shadow-md"
            style={{
              top: 14 * scale,
              left: 10 * scale,
              width: 34 * scale,
              height: 124 * scale,
            }}
          >
            {[18, 36, 54, 72, 90, 108].map((b) => (
              <div
                key={b}
                className="absolute left-0 bg-gray-500 opacity-40"
                style={{ bottom: b * scale, width: 8 * scale, height: 1 }}
              />
            ))}

            {/* Blood fill in barrel */}
            <div
              className="absolute bottom-0 w-full"
              style={{
                height: `${bloodFillPct * 100}%`,
                background: 'linear-gradient(to top, #881337, #dc2626)',
                transition:
                  step === 2
                    ? 'height 2.0s cubic-bezier(0.25, 0.1, 0.25, 1)'
                    : step === 5
                    ? 'height 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
                    : 'height 0.3s ease',
              }}
            />
          </div>

          {/* Needle hub */}
          <div
            className="absolute bg-gray-300 border border-gray-400 rounded-t-xs"
            style={{
              top: 138 * scale,
              left: 20 * scale,
              width: 14 * scale,
              height: 18 * scale,
            }}
          />

          {/* Stainless steel needle */}
          <div
            className="absolute bg-gray-600 shadow-xs"
            style={{
              top: 156 * scale,
              left: 26 * scale,
              width: 2,
              height: 20 * scale,
            }}
          />
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. REALISTIC HAND & ARM (Reference Image 4)           */}
      {/* Placed below syringe needle, vein punctured for blood collection */}
      {/* Disappears completely after blood collection       */}
      {/* ==================================================== */}
      {armVisible && (
        <div
          className="absolute"
          style={{
            top: armTop,
            left: armLeft,
            width: armW,
            height: armH,
            transform: armInPosition ? 'translateX(0)' : 'translateX(120%)',
            opacity: armInPosition ? 1 : 0,
            transition: 'transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
          }}
        >
          <svg
            width={armW}
            height={armH}
            viewBox="0 0 340 160"
            fill="none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="armSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde0c8" />
                <stop offset="25%" stopColor="#f8c9a3" />
                <stop offset="60%" stopColor="#e8a87c" />
                <stop offset="85%" stopColor="#cf8455" />
                <stop offset="100%" stopColor="#b46d42" />
              </linearGradient>

              <radialGradient id="armHighlight" cx="45%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff5ee" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#f8c9a3" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="tourniquetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="35%" stopColor="#0284c7" />
                <stop offset="80%" stopColor="#0369a1" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>

              <linearGradient id="nurseSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>

              <filter id="veinBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>

            {/* Forearm base shadow */}
            <path
              d="M0,125 C60,128 140,132 230,135 C280,136 320,134 340,132 L340,150 L0,150 Z"
              fill="#000"
              opacity="0.07"
            />

            {/* Main arm shape */}
            <path
              d="M0,58 C45,54 90,52 145,55 C190,58 240,68 340,78 L340,132 C260,132 180,130 110,126 C55,123 20,120 0,118 Z"
              fill="url(#armSkinGrad)"
            />

            {/* 3D cylindrical skin highlight along top curve */}
            <path
              d="M0,58 C45,54 90,52 145,55 C190,58 240,68 340,78 L340,95 C240,85 190,75 145,72 C90,69 45,71 0,75 Z"
              fill="url(#armHighlight)"
            />

            {/* Inner elbow crease (cubital fossa) */}
            <path
              d="M75,70 C80,82 82,94 78,106"
              stroke="#b46d42"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              d="M85,76 C90,85 91,95 88,102"
              stroke="#fed7aa"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Superficial Veins (Median Cubital Vein - Image 4) */}
            <g filter="url(#veinBlur)">
              <path
                d="M30,88 C60,86 95,84 135,76 C165,70 190,68 220,67"
                stroke="#0284c7"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.45"
              />
              <path
                d="M85,85 C110,88 135,93 160,98"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.35"
              />
            </g>
            <path
              d="M35,87 C65,85 100,83 135,75 C165,69 190,67 220,66"
              stroke="#bae6fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Blue medical tourniquet band (Reference Image 4) */}
            <g>
              <path d="M12,48 L38,46 L42,126 L16,128 Z" fill="#000" opacity="0.16" />
              <path
                d="M10,50 C18,48 28,47 36,48 L40,124 C32,125 22,126 14,124 Z"
                fill="url(#tourniquetGrad)"
              />
              <path d="M11,51 L35,49" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
              <path d="M13,52 L17,123" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
              <path d="M33,50 L37,123" stroke="#0369a1" strokeWidth="1.5" opacity="0.8" />
              {/* Buckle tab */}
              <rect x="18" y="74" width="16" height="22" rx="3" fill="#0284c7" stroke="#075985" strokeWidth="1.5" />
              <rect x="22" y="79" width="8" height="12" rx="1.5" fill="#f8fafc" />
            </g>

            {/* Nurse's gloved fingers holding syringe hub (Reference Image 4) */}
            <g id="nurseFingers">
              <path
                d="M175,25 C168,32 160,42 154,54 C150,62 147,70 152,74 C157,78 164,74 168,67 C174,57 184,45 195,38 Z"
                fill="url(#nurseSkinGrad)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
              <path d="M162,48 C166,51 170,54 173,53" stroke="#a16207" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
              <path d="M156,58 C160,60 164,62 166,61" stroke="#fef9c3" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

              <path
                d="M128,42 C125,50 123,58 126,64 C129,70 137,70 141,65 C145,59 146,50 144,40 Z"
                fill="url(#nurseSkinGrad)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
              <path d="M129,48 C128,54 129,60 131,63" stroke="#fef9c3" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            </g>

            {/* Puncture site at vein directly below needle tip */}
            <circle cx="140" cy="72" r="3" fill="#dc2626" opacity="0.9" />
            <circle cx="140" cy="72" r="6" fill="#ef4444" opacity="0.3" />
          </svg>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. BLOOD DROP (Forms at needle tip, falls straight down onto slide) */}
      {/* ==================================================== */}
      {dropState !== 'hidden' && (
        <div
          className="absolute"
          style={{
            left: needleTipX - 4,
            top: needleTipY,
            width: 8,
            height: 12,
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            background: 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)',
            boxShadow: '0 2px 6px rgba(185, 28, 28, 0.6)',
            transform:
              dropState === 'forming'
                ? 'scale(0.8)'
                : `translateY(${dropDistance}px) scale(1.1)`,
            opacity: 1,
            transition:
              dropState === 'falling'
                ? 'transform 0.60s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
                : 'transform 0.35s ease-out',
          }}
        />
      )}

      {/* ==================================================== */}
      {/* 5. GLASS SLIDE (Appears after hand disappears, moves through gapY) */}
      {/* ==================================================== */}
      {slideVisible && (
        <div
          className="absolute"
          style={{
            top: slideY,
            left: currentSlideLeft,
            width: slideW,
            height: slideH,
            animation: 'fadeInSlide 0.4s ease-out',
            transition: slideTraveling
              ? 'left 2.6s cubic-bezier(0.45, 0, 0.55, 1)'
              : 'none',
          }}
        >
          {/* Glass slide body */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              background: 'rgba(186, 230, 253, 0.88)',
              border: '2px solid #94a3b8',
              borderRadius: 3,
              boxShadow:
                '0 3px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            {/* Glass specular sheen */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 6 * scale,
                borderRadius: '2px 2px 0 0',
                background: 'rgba(255,255,255,0.6)',
              }}
            />

            {/* Blood smear (appears on slide center once drop lands) */}
            {smearVisible && (
              <div
                style={{
                  width: 20 * scale,
                  height: 7 * scale,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, #dc2626 40%, #991b1b 90%)',
                  boxShadow: '0 0 6px rgba(220, 38, 38, 0.65)',
                  transform: 'scale(1)',
                  animation: 'splat 0.25s ease-out',
                }}
              />
            )}
          </div>

          {/* Micro label */}
          <div
            style={{
              textAlign: 'center',
              fontSize: Math.max(6, 7 * scale),
              color: '#64748b',
              letterSpacing: '0.12em',
              marginTop: 2,
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            BLOOD SAMPLE
          </div>

          {/* "Analyzing..." badge in testing step */}
          {analyzingBadge && (
            <div
              style={{
                position: 'absolute',
                top: -26 * scale,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(15, 23, 42, 0.92)',
                color: '#38bdf8',
                fontSize: Math.max(9, 10 * scale),
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              🔬 Analyzing...
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 6. SAMPLE REPORT CARD (Top-Left of Hero)             */}
      {/* ==================================================== */}
      {reportVisible && (
        <div
          className="absolute"
          style={{
            top: 20,
            left: 20,
            width: Math.min(210, dims.W * 0.42),
            background: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: '10px 12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeInReport 0.4s ease-out',
          }}
        >
          {/* Card Header */}
          <div
            style={{
              borderBottom: '1px solid #fee2e2',
              paddingBottom: 5,
              marginBottom: 6,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  color: '#dc2626',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Sample Report
              </span>
              <span
                style={{
                  fontSize: 7,
                  color: '#94a3b8',
                  fontStyle: 'italic',
                }}
              >
                Illustrative
              </span>
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: '#0b1f3a',
                marginTop: 1,
              }}
            >
              Jai Bhavani Diagnostics
            </div>
          </div>

          {/* Test Rows Revealed One by One */}
          <div className="flex flex-col gap-1">
            {REPORT_DATA.slice(0, revealedLines).map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
                style={{
                  fontSize: 8.5,
                  padding: '1.5px 0',
                  borderBottom: '1px dashed #f1f5f9',
                  animation: 'fadeInRow 0.3s ease-out',
                }}
              >
                <span style={{ color: '#475569', fontWeight: 500 }}>
                  {row.label}
                </span>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Verified Stamp */}
          {verifiedStamp && (
            <div
              style={{
                marginTop: 8,
                padding: '4px 8px',
                background: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                animation: 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
            >
              <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 900 }}>
                ✓
              </span>
              <span
                style={{
                  color: '#15803d',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Verified Result
              </span>
            </div>
          )}
        </div>
      )}

      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes splat {
          0% { transform: scale(0.2); opacity: 0.5; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInReport {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRow {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
