import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhenWeAreOldData } from '../../types/universe';
import { Sparkles, Lock, X, Heart, ShieldAlert } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface WhenWeAreOldProps {
  data: WhenWeAreOldData;
}

export const WhenWeAreOld: React.FC<WhenWeAreOldProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const yearsRemaining = data.unlockYear - currentYear;

  const handleOpenChest = () => {
    audioEngine.playChime();
    setIsOpen(true);
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The 20-Year Covenant
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          {data.title}
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-lg mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* Sealed Heirloom Box Visual */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        onClick={handleOpenChest}
        className="relative max-w-lg mx-auto bg-[#1a1714] border-2 border-[var(--gold-border)] p-10 sm:p-14 shadow-2xl cursor-pointer group overflow-hidden"
      >
        {/* Intricate Filigree Corners */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[var(--accent)]" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[var(--accent)]" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[var(--accent)]" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[var(--accent)]" />

        {/* Vintage Seal Center */}
        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#2b241d] to-[#141210] border-2 border-[var(--accent)] shadow-2xl flex flex-col items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-500">
            <Lock className="w-6 h-6 mb-1 text-[var(--accent)]" />
            <span className="text-[9px] font-cinzel tracking-widest">{data.unlockYear}</span>
          </div>

          <div className="space-y-2">
            <span className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F5] tracking-widest block uppercase">
              SEALED UNTIL {data.unlockYear}
            </span>
            <p className="font-serif italic text-sm text-[var(--accent-light)] font-light">
              “Open when you’ve been married for 20 years.”
            </p>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase block pt-2">
              {yearsRemaining} years remaining in our sacred journey
            </span>
          </div>

          <div className="pt-2">
            <span className="inline-block px-5 py-2 border border-[var(--accent)]/50 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-colors font-medium">
              Couple Access: Open Heirloom Vault →
            </span>
          </div>
        </div>
      </motion.div>

      {/* Unlocked Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl my-8 bg-[#181512] border-2 border-[var(--accent)] p-8 sm:p-14 shadow-2xl text-left space-y-8"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white p-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-[var(--gold-border)]/40 pb-6 text-center space-y-2">
                <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-[var(--accent)] block">
                  A LETTER ACROSS TWO DECADES
                </span>
                <h3 className="font-cinzel text-3xl text-[#FAF8F5] tracking-wider uppercase font-light">
                  TO OUR FUTURE SELVES IN {data.unlockYear}
                </h3>
              </div>

              {/* Message */}
              <div className="font-serif text-lg sm:text-xl text-[#ded6c7] font-light leading-relaxed whitespace-pre-line tracking-wide">
                {data.message}
              </div>

              {/* Vow quote */}
              <div className="p-6 bg-[#13110f] border-l-2 border-[var(--accent)] italic font-serif text-lg text-[var(--accent-light)]">
                {data.vowToOldAge}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[var(--gold-border)]/40 text-xs font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase">
                <span className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Muniza & Muzamil • The Forever Archive
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-[var(--gold-border)] hover:border-[var(--accent)] text-[10px] text-white uppercase"
                >
                  Reseal Box
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
