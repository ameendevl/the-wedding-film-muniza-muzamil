import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TwoHeartsStoriesData, PartnerRole } from '../../types/universe';
import { Heart, Sparkles, Feather, Bookmark } from 'lucide-react';

interface TwoHeartsStoriesProps {
  data: TwoHeartsStoriesData;
}

export const TwoHeartsStories: React.FC<TwoHeartsStoriesProps> = ({ data }) => {
  const [activeSide, setActiveSide] = useState<PartnerRole>('bride');
  const [showUnited, setShowUnited] = useState<boolean>(false);

  const activeStory = activeSide === 'bride' ? data.her : data.his;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Same Day. Two Different Hearts.
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          TWO HEARTS — TWO STORIES
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto leading-relaxed">
          How one rainy afternoon felt from two sides of the same table.
        </p>
      </div>

      {/* Perspective Switcher Buttons */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 mb-12">
        <button
          onClick={() => {
            setActiveSide('bride');
            setShowUnited(false);
          }}
          className={`flex items-center gap-2.5 px-6 py-2.5 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            activeSide === 'bride' && !showUnited
              ? 'bg-[var(--accent)] text-black font-medium shadow-[0_0_20px_rgba(201,169,110,0.4)] border border-[var(--accent)]'
              : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)]'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
          <span>HER STORY ❤️ (Muniza)</span>
        </button>

        <button
          onClick={() => {
            setActiveSide('groom');
            setShowUnited(false);
          }}
          className={`flex items-center gap-2.5 px-6 py-2.5 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            activeSide === 'groom' && !showUnited
              ? 'bg-[var(--accent)] text-black font-medium shadow-[0_0_20px_rgba(201,169,110,0.4)] border border-[var(--accent)]'
              : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-slate-300" />
          <span>HIS STORY 🤍 (Muzamil)</span>
        </button>
      </div>

      {/* Cinematic Perspective Diary Card */}
      <AnimatePresence mode="wait">
        {!showUnited ? (
          <motion.div
            key={activeSide}
            initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -25, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#171513] border border-[var(--gold-border)] p-8 sm:p-14 shadow-2xl space-y-10 group overflow-hidden"
          >
            {/* Subtle paper watermark texture */}
            <div className="absolute top-4 right-6 font-cinzel text-6xl text-[var(--accent)]/5 select-none pointer-events-none">
              {activeSide === 'bride' ? 'M' : 'M'}
            </div>

            {/* Author Title Bar */}
            <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-5">
              <div className="flex items-center gap-3">
                <Feather className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-serif italic text-xl sm:text-2xl text-[var(--accent-light)]">
                  From {activeStory.authorName}’s Journal
                </span>
              </div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--text-muted)]">
                {activeSide === 'bride' ? 'HER REFLECTIONS' : 'HIS REFLECTIONS'}
              </span>
            </div>

            {/* The 6 Heart Prompts */}
            <div className="space-y-8">
              {/* 1. What I felt */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] block">
                  01 • WHAT I FELT
                </span>
                <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed tracking-wide">
                  "{activeStory.feeling}"
                </p>
              </div>

              {/* 2. What I remember */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] block">
                  02 • WHAT I REMEMBER
                </span>
                <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed tracking-wide">
                  "{activeStory.remember}"
                </p>
              </div>

              {/* 3. What I was thinking */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] block">
                  03 • WHAT I WAS THINKING
                </span>
                <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed tracking-wide">
                  "{activeStory.thinking}"
                </p>
              </div>

              {/* 4. What made me smile */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] block">
                  04 • WHAT MADE ME SMILE
                </span>
                <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed tracking-wide">
                  "{activeStory.smile}"
                </p>
              </div>

              {/* 5. What I was nervous about */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] block">
                  05 • WHAT I WAS NERVOUS ABOUT
                </span>
                <p className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-light leading-relaxed tracking-wide">
                  "{activeStory.nervous}"
                </p>
              </div>

              {/* 6. What I will never forget */}
              <div className="space-y-2 pt-2 border-t border-[var(--gold-border)]/30">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent-light)] block">
                  06 • WHAT I WILL NEVER FORGET
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[var(--accent-light)] font-normal leading-relaxed tracking-wide">
                  "{activeStory.neverForget}"
                </p>
              </div>
            </div>

            {/* Merge into One Story Button */}
            <div className="pt-6 text-center border-t border-[var(--gold-border)]/40">
              <button
                onClick={() => setShowUnited(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)]/60 hover:border-[var(--accent)] bg-[#1e1a16] text-[11px] font-sans tracking-[0.3em] uppercase text-[var(--accent)] hover:text-white transition-all duration-300 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Merge Into “One Story” →</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* United "ONE STORY" View */
          <motion.div
            key="united"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-b from-[#181512] via-[#141210] to-[#181512] border-2 border-[var(--accent)]/60 p-8 sm:p-16 shadow-2xl text-center space-y-8"
          >
            {/* Corner Filigrees */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)]" />

            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-[var(--accent)]">
                THE SACRED HARMONY
              </span>
              <h3 className="font-cinzel text-3xl sm:text-5xl text-[#FAF8F5] tracking-[0.2em] uppercase font-light">
                {data.unitedVow.title}
              </h3>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-[#f3ede1] font-light leading-relaxed max-w-2xl mx-auto">
              "{data.unitedVow.text}"
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs font-sans tracking-[0.25em] text-[var(--accent-light)] uppercase">
              <span>Muniza’s Heart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Muzamil’s Heart</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>One Soul</span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setShowUnited(false)}
                className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors underline underline-offset-4 cursor-pointer"
              >
                ← Return to Individual Journal Pages
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
