import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface PrologueIntroProps {
  wedding: WeddingData;
  onEnter: () => void;
}

export const PrologueIntro: React.FC<PrologueIntroProps> = ({ wedding, onEnter }) => {
  // Cinematic step sequencing
  // 0: Quote 1 "Some stories are written."
  // 1: Quote 2 "Some are lived."
  // 2: Monogram + Names + Date + Enter Button
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2200);
    const timer2 = setTimeout(() => setStep(2), 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleEnterClick = () => {
    // Start subtle ambient piano on user gesture (respects browser autoplay policy)
    if (!audioEngine.getIsPlaying()) {
      audioEngine.startAmbient();
    }
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0908] overflow-hidden select-none"
    >
      {/* Cinematic Background with Slow Parallax / Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.38] contrast-[1.1] scale-105 animate-slow-zoom"
          style={{ backgroundImage: `url(${wedding.heroPhoto})` }}
        />
        {/* Editorial Vignette and Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/60 to-[#0a0908]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,9,8,0.85)_100%)]" />
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-[var(--text-primary)]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="quote1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="py-12"
            >
              <span className="font-serif italic text-3xl md:text-5xl font-light tracking-wide text-[#E8E2D9]">
                "{wedding.prologueQuote1}"
              </span>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="quote2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="py-12"
            >
              <span className="font-serif italic text-3xl md:text-5xl font-light tracking-wide text-[var(--accent-light)]">
                "{wedding.prologueQuote2}"
              </span>
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              key="main-reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-8"
            >
              {/* Couple Initial Monogram Crest */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="w-16 h-16 rounded-full border border-[var(--gold-border)] flex items-center justify-center relative group"
              >
                <div className="absolute inset-1 rounded-full border border-[var(--gold-border)]/50" />
                <span className="font-cinzel text-xs tracking-widest text-[var(--accent)]">
                  {wedding.initials}
                </span>
              </motion.div>

              {/* Editorial Names */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="space-y-3"
              >
                <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light text-[#F7F4EE] uppercase">
                  {wedding.brideName} <span className="font-serif italic font-normal lowercase text-[var(--accent)] text-2xl md:text-4xl px-2">&</span> {wedding.groomName}
                </h1>
                <p className="text-xs md:text-sm font-sans tracking-[0.35em] text-[var(--text-secondary)] uppercase">
                  {wedding.weddingDisplayDate.toUpperCase()} • {wedding.city.toUpperCase()}
                </p>
              </motion.div>

              {/* Divider */}
              <div className="w-12 h-[1px] bg-[var(--gold-border)] opacity-60" />

              {/* Enter Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                onClick={handleEnterClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 border border-[var(--gold-border)] bg-[#171513]/80 hover:bg-[#201d19] backdrop-blur-sm text-xs font-sans tracking-[0.3em] uppercase text-[#F7F4EE] transition-all duration-500 hover:border-[var(--accent)] hover:tracking-[0.35em] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>ENTER THEIR STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 border border-[var(--accent)]/30 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
              </motion.button>

              <span className="text-[10px] tracking-luxury uppercase text-[var(--text-muted)] flex items-center gap-1.5 pt-2">
                <Sparkles className="w-2.5 h-2.5 text-[var(--accent)]" />
                Audio Enabled for Cinematic Experience
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button in bottom-right for instant access */}
      {step < 2 && (
        <button
          onClick={() => setStep(2)}
          className="absolute bottom-6 right-8 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          Skip Intro →
        </button>
      )}
    </motion.div>
  );
};
