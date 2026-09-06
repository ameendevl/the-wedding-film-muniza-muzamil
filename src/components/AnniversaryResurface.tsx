import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../types';
import { Sparkles, Calendar, Heart, Clock } from 'lucide-react';

interface AnniversaryResurfaceProps {
  wedding: WeddingData;
}

export const AnniversaryResurface: React.FC<AnniversaryResurfaceProps> = ({
  wedding,
}) => {
  return (
    <section className="py-24 px-6 relative max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="border border-[var(--gold-border)] bg-[#171412] p-8 sm:p-14 md:p-16 shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--accent)]/10 blur-3xl pointer-events-none" />

        <div className="text-center mb-12 space-y-3 relative z-10">
          <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            The Anniversary Resurface
          </span>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] font-light text-[#FAF8F5] uppercase">
            ONE YEAR AGO TODAY
          </h2>
          <p className="font-serif italic text-lg text-[var(--accent-light)] font-light max-w-xl mx-auto">
            “365 days of sacred companionship, shared tea, laughter through quiet storms, and building the home we once dreamed of.”
          </p>
          <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />
        </div>

        {/* Resurfaced Memory Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4 relative z-10">
          <div className="relative border border-[var(--gold-border)] overflow-hidden group shadow-xl">
            <img
              src={wedding.heroPhoto}
              alt="Anniversary milestone"
              className="w-full h-80 object-cover filter contrast-[1.05] brightness-95 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-[var(--gold-border)] text-[10px] tracking-luxury uppercase text-[#FAF8F5]">
              {wedding.weddingDisplayDate}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-cinzel text-2xl text-[var(--text-primary)] block">
                The Vow We Kept
              </span>
              <p className="font-serif italic text-base text-[var(--text-secondary)] leading-relaxed">
                "{wedding.dna.signatureQuote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--gold-border)]/50 space-y-3">
              <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span>Wedding Date: {wedding.weddingDisplayDate}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--accent)]" />
                <span>Days of Marriage: 365 Days & Counting</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                <Heart className="w-4 h-4 text-[var(--accent)]" />
                <span>Memories Archived: {wedding.memories.length + 42} Moments & Blessings</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
