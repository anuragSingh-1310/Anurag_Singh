import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cpu, Layers, ShieldCheck, Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  "Initializing premium web container...",
  "Loading typography & design tokens...",
  "Compiling interactive WebGL components...",
  "Building responsive React DOM nodes...",
  "Connecting state listener & credentials...",
  "Optimizing layout rendering matrices...",
  "Successfully loaded!"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animate progress percentage smoothly
  useEffect(() => {
    let currentProgress = 0;
    const intervalTime = 15; // smooth fast progress updates
    
    const timer = setInterval(() => {
      // Simulate non-linear smooth loading progress
      const increment = Math.max(1, Math.floor(Math.random() * 4));
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      // Map progress percentages to status step texts
      const stepCount = LOADING_STEPS.length;
      const index = Math.min(
        stepCount - 1,
        Math.floor((currentProgress / 100) * stepCount)
      );
      setStepIndex(index);

      if (currentProgress >= 100) {
        clearInterval(timer);
        
        // Ensure standard window 'load' event has also fired before finishing
        const checkWindowLoaded = () => {
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
              onComplete();
            }, 700); // allow fade out animation to finish
          }, 400); // brief final visual stay at 100%
        };

        if (document.readyState === 'complete') {
          checkWindowLoaded();
        } else {
          window.addEventListener('load', checkWindowLoaded, { once: true });
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -40,
            filter: 'blur(15px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[10000] bg-zinc-950 flex flex-col items-center justify-between py-16 px-6 select-none overflow-hidden"
        >
          {/* Subtle background ambient lights to match the website theme */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-art-accent/10 blur-[130px] opacity-75 animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-art-accent-ter/10 blur-[140px] opacity-50" />
          </div>

          {/* Top Bar - Brand and Tech Badge */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10 opacity-70">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-black tracking-widest text-zinc-100">
                ANURAG<span className="text-art-accent font-serif italic">.</span>SINGH
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-art-accent animate-ping" />
              <span>SYSTEM INCOMING</span>
            </div>
          </div>

          {/* Central Logo and Progress Display */}
          <div className="flex flex-col items-center justify-center text-center z-10 relative max-w-lg">
            
            {/* Visual Decorative Icon */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-20 h-20 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-art-accent/20 to-art-gold/20 border border-art-accent/30 animate-spin" style={{ animationDuration: '12s' }} />
              <div className="absolute inset-2 rounded-xl bg-zinc-900/90 border border-art-border flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-art-accent animate-pulse" />
              </div>
            </motion.div>

            {/* Central Portfolio Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2 mb-10"
            >
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
                Anurag Singh <span className="text-art-accent font-serif italic font-normal">Portfolio</span>
              </h1>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                Scholarly Research & Full-Stack Portfolio
              </p>
            </motion.div>

            {/* Linear Progress bar */}
            <div className="w-64 sm:w-80 h-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-art-accent via-art-accent-sec to-art-gold rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Percentage indicator */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="font-mono text-2xl font-bold tracking-tight text-white">
                {progress}%
              </span>
              
              {/* Dynamic Status Steps text with exit/enter transitions */}
              <div className="h-6 mt-1 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={LOADING_STEPS[stepIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-[11px] font-semibold text-zinc-400 tracking-wider uppercase flex items-center gap-2"
                  >
                    {stepIndex === 0 && <Cpu className="w-3.5 h-3.5 text-art-accent animate-spin" />}
                    {stepIndex === 1 && <Layers className="w-3.5 h-3.5 text-art-accent animate-pulse" />}
                    {stepIndex === 2 && <Sparkles className="w-3.5 h-3.5 text-art-gold animate-pulse" />}
                    {stepIndex >= 3 && <ShieldCheck className="w-3.5 h-3.5 text-art-accent-ter" />}
                    <span>{LOADING_STEPS[stepIndex]}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom decorative stats line */}
          <div className="w-full max-w-5xl flex justify-center text-center z-10 opacity-40 font-mono text-[10px] tracking-wider text-zinc-500">
            <div className="flex items-center gap-1">
              <span>MADE WITH</span>
              <Heart className="w-3 h-3 text-art-accent fill-art-accent animate-pulse" />
              <span>IN REACT / TAILWIND CSS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
