import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhyIChoseYouData, PartnerRole } from '../../types/universe';
import { Sparkles, ChevronLeft, ChevronRight, Plus, Heart } from 'lucide-react';
import { addWhyIChoseYouReason } from '../../services/universeStorage';

interface WhyIChoseYouProps {
  data: WhyIChoseYouData;
  onUpdate?: () => void;
}

export const WhyIChoseYou: React.FC<WhyIChoseYouProps> = ({ data, onUpdate }) => {
  const [activeRole, setActiveRole] = useState<PartnerRole>('bride');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newReasonText, setNewReasonText] = useState<string>('');

  const reasons = activeRole === 'bride' ? data.herReasons : data.hisReasons;
  const isAtEnd = currentIndex >= reasons.length;

  const handleNext = () => {
    if (currentIndex < reasons.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSaveReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;
    addWhyIChoseYouReason(activeRole, newReasonText.trim());
    setNewReasonText('');
    setIsAdding(false);
    onUpdate?.();
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Reasons My Soul Picked Yours
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          WHY I CHOSE YOU
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Every reason, whisper, and quiet vow we carry in our hearts.
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mb-12">
        <button
          onClick={() => {
            setActiveRole('bride');
            setCurrentIndex(0);
          }}
          className={`flex items-center gap-2 px-6 py-2.5 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            activeRole === 'bride'
              ? 'bg-[var(--accent)] text-black font-semibold shadow-[0_0_20px_rgba(201,169,110,0.4)] border border-[var(--accent)]'
              : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
          <span>Why Muniza Chose Muzamil</span>
        </button>

        <button
          onClick={() => {
            setActiveRole('groom');
            setCurrentIndex(0);
          }}
          className={`flex items-center gap-2 px-6 py-2.5 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            activeRole === 'groom'
              ? 'bg-[var(--accent)] text-black font-semibold shadow-[0_0_20px_rgba(201,169,110,0.4)] border border-[var(--accent)]'
              : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current text-amber-200" />
          <span>Why Muzamil Chose Muniza</span>
        </button>
      </div>

      {/* Card Presentation */}
      <div className="relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isAtEnd ? (
            /* Reason Slide */
            <motion.div
              key={`${activeRole}-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#181512] border border-[var(--gold-border)] p-8 sm:p-14 shadow-2xl text-center space-y-8 relative overflow-hidden"
            >
              {/* Counter Badge */}
              <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-4 text-xs font-sans tracking-[0.25em] text-[var(--accent)] uppercase">
                <span>
                  {activeRole === 'bride' ? 'Muniza’s Heart' : 'Muzamil’s Heart'}
                </span>
                <span>
                  Reason {currentIndex + 1} of {reasons.length}
                </span>
              </div>

              {/* The Reason Text */}
              <div className="py-6">
                <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FAF8F5] font-light leading-relaxed tracking-wide">
                  "{reasons[currentIndex]?.text}"
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--gold-border)]/40">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Dot progression */}
                <div className="flex items-center gap-1.5">
                  {reasons.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'w-6 bg-[var(--accent)]'
                          : 'w-1.5 bg-[var(--gold-border)]/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 text-xs font-sans tracking-[0.2em] uppercase text-[var(--accent)] hover:text-white font-medium cursor-pointer"
                >
                  <span>{currentIndex === reasons.length - 1 ? 'Reveal Conclusion' : 'Next Reason'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Cinematic Reveal: "AND I WOULD CHOOSE YOU AGAIN." */
            <motion.div
              key="final-reveal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-gradient-to-b from-[#1b1713] via-[#12100e] to-[#1b1713] border-2 border-[var(--accent)] p-10 sm:p-16 shadow-[0_0_50px_rgba(201,169,110,0.15)] text-center space-y-8 relative overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)]" />

              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-[var(--accent)] block">
                THE FINAL COVENANT
              </span>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-cinzel text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] tracking-[0.16em] uppercase font-light leading-snug drop-shadow-md"
              >
                AND I WOULD CHOOSE YOU AGAIN.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="font-serif italic text-lg sm:text-xl text-[var(--accent-light)] font-light max-w-lg mx-auto"
              >
                In every lifetime, through every storm, under every sky—I will always find you.
              </motion.p>

              <div className="pt-6 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentIndex(0)}
                  className="px-6 py-2.5 border border-[var(--gold-border)] hover:border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-white transition-all cursor-pointer"
                >
                  ← Read All Reasons Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add a Reason Drawer / Button */}
      <div className="mt-8 text-center">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a new reason ({activeRole === 'bride' ? 'as Muniza' : 'as Muzamil'})</span>
          </button>
        ) : (
          <form
            onSubmit={handleSaveReason}
            className="max-w-md mx-auto bg-[#171512] border border-[var(--gold-border)] p-6 space-y-4 text-left shadow-xl"
          >
            <label className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] block">
              Write your reason ({activeRole === 'bride' ? 'Muniza' : 'Muzamil'})
            </label>
            <textarea
              rows={3}
              value={newReasonText}
              onChange={(e) => setNewReasonText(e.target.value)}
              placeholder="I chose you because..."
              className="w-full bg-[#12100e] border border-[var(--gold-border)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-serif"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-[10px] font-sans uppercase text-[var(--text-muted)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[var(--accent)] text-black text-[10px] font-sans tracking-luxury uppercase font-medium"
              >
                Save this memory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
