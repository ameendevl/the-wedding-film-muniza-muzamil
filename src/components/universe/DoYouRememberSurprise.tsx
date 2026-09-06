import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemorySurpriseItem } from '../../types/universe';
import { Sparkles, RefreshCw, Calendar, MapPin, Heart } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface DoYouRememberSurpriseProps {
  surprises: MemorySurpriseItem[];
}

export const DoYouRememberSurprise: React.FC<DoYouRememberSurpriseProps> = ({ surprises }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const memory = surprises[currentIndex];

  const handleNextRandom = () => {
    audioEngine.playChime();
    const nextIdx = (currentIndex + 1) % surprises.length;
    setCurrentIndex(nextIdx);
  };

  if (!memory) return null;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Nostalgia Resurfacer
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          DO YOU REMEMBER?
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Random moments resurfacing to remind us how far we’ve traveled hand in hand.
        </p>
      </div>

      {/* Main Memory Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7 }}
          className="bg-[#171412] border border-[var(--gold-border)] p-6 sm:p-12 shadow-2xl space-y-8"
        >
          {/* Photograph */}
          <div className="relative overflow-hidden border border-[var(--gold-border)] max-w-lg mx-auto shadow-xl">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="w-full h-64 sm:h-80 object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-2 border border-white/10 pointer-events-none" />
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-xs font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[var(--accent)]" /> {memory.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[var(--accent)]" /> {memory.location}
              </span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F5] tracking-wide uppercase font-light">
              {memory.title}
            </h3>
            <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto font-light leading-relaxed">
              "{memory.memory}"
            </p>
          </div>

          {/* Couple Comments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--gold-border)]/40">
            {memory.herComment && (
              <div className="bg-[#1c1916] p-4 border border-[var(--gold-border)]/40 space-y-1">
                <span className="text-[10px] font-sans tracking-widest text-rose-300 uppercase block">
                  Muniza’s Reflection
                </span>
                <p className="font-serif italic text-sm text-[var(--text-primary)]">
                  {memory.herComment}
                </p>
              </div>
            )}
            {memory.hisComment && (
              <div className="bg-[#1c1916] p-4 border border-[var(--gold-border)]/40 space-y-1">
                <span className="text-[10px] font-sans tracking-widest text-amber-200 uppercase block">
                  Muzamil’s Reflection
                </span>
                <p className="font-serif italic text-sm text-[var(--text-primary)]">
                  {memory.hisComment}
                </p>
              </div>
            )}
          </div>

          {/* Resurface Another Button */}
          <div className="pt-4 text-center">
            <button
              onClick={handleNextRandom}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[var(--accent)]/50 hover:border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-[var(--accent)] hover:text-white transition-all cursor-pointer bg-[#141210]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resurface Another Memory</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
