import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Sun, ArrowRight, Eye, RefreshCw } from 'lucide-react';

const INACTIVITY_TIME = 3 * 60 * 1000; // 3 minutes

const ZEN_QUOTES = [
  "rest and reflect.",
  "ideas flourish in stillness.",
  "creativity needs space to breathe.",
  "recharging creative reserves.",
  "softly waiting.",
  "silence is the canvas of the mind.",
  "be here, now.",
  "embrace the slow pace of thoughts.",
  "stillness in motion, peace in mind."
];

export default function SleepScreen() {
  const [isAsleep, setIsAsleep] = useState(false);
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(ZEN_QUOTES[0]);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  // Interactive countdown warning if the user is about to go to sleep (e.g. at 4m 50s)
  const [showWarning, setShowWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(10);

  // Digital clock update
  useEffect(() => {
    if (!isAsleep) return;
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isAsleep]);

  // Breathing meditation loop (8-second cycle: 4s inhale, 4s exhale)
  useEffect(() => {
    if (!isAsleep) return;
    const timer = setInterval(() => {
      setBreathPhase((prev) => (prev === 'Inhale' ? 'Exhale' : 'Inhale'));
    }, 4000);
    return () => clearInterval(timer);
  }, [isAsleep]);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let warningTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const startInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);
      setShowWarning(false);

      if (isAsleep) return;

      // Warning triggers 10 seconds before sleep mode (at 4 mins 50 seconds)
      const warningDelay = INACTIVITY_TIME - 10000;

      warningTimer = setTimeout(() => {
        setShowWarning(true);
        setWarningCountdown(10);
        
        let timeLeft = 10;
        countdownInterval = setInterval(() => {
          timeLeft -= 1;
          setWarningCountdown(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);
      }, warningDelay);

      // Sleep triggers at 5 minutes
      inactivityTimer = setTimeout(() => {
        setQuote(ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)]);
        setIsAsleep(true);
        setShowWarning(false);
      }, INACTIVITY_TIME);
    };

    // User activity listeners
    const handleActivity = () => {
      if (isAsleep) {
        // Wake up immediately on any interaction!
        setIsAsleep(false);
      }
      startInactivityTimer();
    };

    // Listen to custom event to manually trigger sleep mode
    const handleManualSleep = () => {
      setQuote(ZEN_QUOTES[Math.floor(Math.random() * ZEN_QUOTES.length)]);
      setIsAsleep(true);
      setShowWarning(false);
    };

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ];

    // Initial registration
    startInactivityTimer();
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    window.addEventListener('trigger-sleep', handleManualSleep);

    return () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      clearInterval(countdownInterval);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      window.removeEventListener('trigger-sleep', handleManualSleep);
    };
  }, [isAsleep]);

  // Clock formatters
  const formatDigits = (val: number) => String(val).padStart(2, '0');
  const formattedHours = formatDigits(time.getHours());
  const formattedMinutes = formatDigits(time.getMinutes());
  const formattedSeconds = formatDigits(time.getSeconds());
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* 10-Second Pre-sleep Overlay Warning */}
      <AnimatePresence>
        {showWarning && !isAsleep && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-zinc-950/90 dark:bg-white/95 border border-art-accent/40 shadow-[0_12px_40px_rgba(0,0,0,0.25)] flex items-center gap-4 select-none backdrop-blur-md max-w-sm"
          >
            <div className="flex-1">
              <p className="text-xs font-mono tracking-wider text-art-accent font-semibold uppercase flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 animate-pulse" /> Inactivity Alert
              </p>
              <p className="text-sm font-sans font-medium text-zinc-100 dark:text-zinc-900 mt-1">
                Entering sleep mode in <span className="font-mono text-base font-bold text-art-accent">{warningCountdown}s</span>
              </p>
            </div>
            <button
              onClick={() => {
                // Wake/dismiss
                setShowWarning(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-art-accent text-white hover:bg-art-accent/90 active:scale-95 transition-all cursor-pointer"
            >
              Stay Awake
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Immersive Sleep Screen saver overlay */}
      <AnimatePresence>
        {isAsleep && (
          <motion.div
            key="sleep-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: 'blur(10px)',
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[9999] bg-[var(--bg-base)]/95 backdrop-blur-3xl art-grid flex flex-col items-center justify-between py-12 px-6 select-none overflow-hidden"
          >
            {/* Background floating organic lighting circles */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {/* Primary accent light */}
              <motion.div
                animate={{
                  x: [0, 40, -40, 0],
                  y: [0, -60, 60, 0],
                  scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-art-accent/10 blur-[130px]"
              />
              {/* Sage Green secondary accent light */}
              <motion.div
                animate={{
                  x: [0, -50, 50, 0],
                  y: [0, 40, -40, 0],
                  scale: [1, 0.9, 1.2, 1],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-art-accent-ter/10 blur-[150px]"
              />
              {/* Gold accent light */}
              <motion.div
                animate={{
                  x: [0, 30, -30, 0],
                  y: [0, 40, -40, 0],
                  scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-art-gold/8 blur-[120px]"
              />
            </div>

            {/* Top Bar - Header matching the aesthetic */}
            <div className="w-full max-w-5xl flex items-center justify-between z-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-black tracking-wider text-art-text">
                  ANURAG<span className="text-art-accent font-serif italic">.</span>SINGH
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-art-accent animate-ping" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-art-text-muted">
                <Sparkles className="w-3.5 h-3.5 text-art-gold animate-pulse" />
                <span>REST MODE ACTIVE</span>
              </div>
            </div>

            {/* Central Clock & Breathing Meditative Ring */}
            <div className="flex flex-col items-center justify-center z-10 my-auto relative">
              {/* Zen Breathing Visualizer ring */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
                
                {/* Breathing outer pulsing ring */}
                <motion.div
                  animate={{
                    scale: breathPhase === 'Inhale' ? 1.12 : 0.92,
                    opacity: breathPhase === 'Inhale' ? 0.8 : 0.45,
                    borderWidth: breathPhase === 'Inhale' ? '2px' : '4px',
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-solid border-art-accent/40 flex items-center justify-center"
                />

                {/* Secondary delay wave ring */}
                <motion.div
                  animate={{
                    scale: breathPhase === 'Inhale' ? 1.25 : 0.85,
                    opacity: breathPhase === 'Inhale' ? 0.3 : 0.15,
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-art-gold/30"
                />

                {/* Inner Breathing State Message */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                  <motion.span
                    key={breathPhase}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 1 }}
                    className="font-mono text-xs uppercase tracking-[0.3em] text-art-accent font-medium bg-art-bg/80 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-art-border/30"
                  >
                    {breathPhase === 'Inhale' ? 'breathe in...' : 'breathe out...'}
                  </motion.span>
                </div>

                {/* Elegant Digital Clock */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline justify-center select-none">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight text-art-text">
                      {formattedHours}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-6xl sm:text-7xl md:text-8xl font-display font-light text-art-accent px-1"
                    >
                      :
                    </motion.span>
                    <span className="text-6xl sm:text-7xl md:text-8xl font-display font-light tracking-tight text-art-text">
                      {formattedMinutes}
                    </span>
                    <span className="ml-1 text-base sm:text-lg font-mono font-medium text-art-accent-sec align-super">
                      {formattedSeconds}
                    </span>
                  </div>

                  {/* Date Underneath */}
                  <p className="mt-4 font-serif text-sm sm:text-base tracking-wider text-art-text-muted">
                    {formattedDate}
                  </p>
                </div>
              </div>

              {/* Zen Motivational / Calm Quotes */}
              <div className="mt-8 h-12 flex items-center justify-center text-center max-w-md px-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quote}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 1 }}
                    className="font-serif italic text-base sm:text-lg text-art-text-muted tracking-wide"
                  >
                    “{quote}”
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Interaction Instruction Panel */}
            <div className="w-full flex flex-col items-center gap-4 z-10">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-art-text-muted">
                  move cursor or press key to awake
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-art-accent" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
