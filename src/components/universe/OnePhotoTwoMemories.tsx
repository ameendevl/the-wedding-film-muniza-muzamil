import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnePhotoTwoMemoriesItem } from '../../types/universe';
import { Sparkles, Calendar, MapPin, Heart } from 'lucide-react';

interface OnePhotoTwoMemoriesProps {
  items: OnePhotoTwoMemoriesItem[];
}

export const OnePhotoTwoMemories: React.FC<OnePhotoTwoMemoriesProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<OnePhotoTwoMemoriesItem>(items[0]);

  return (
    <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Dual Perspective Storytelling
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          ONE PHOTO — TWO MEMORIES
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          The same captured split-second through two different souls.
        </p>
      </div>

      {/* Selector Tabs if multiple */}
      {items.length > 1 && (
        <div className="flex justify-center gap-4 mb-10">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`px-5 py-2 text-xs font-sans tracking-[0.2em] uppercase transition-all cursor-pointer ${
                activeItem.id === item.id
                  ? 'bg-[var(--accent)] text-black font-semibold shadow-lg'
                  : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white bg-[#141210]'
              }`}
            >
              Moment 0{idx + 1}: {item.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Dual Memory Card */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-[#171412] border border-[var(--gold-border)] p-6 sm:p-12 shadow-2xl space-y-10"
      >
        {/* The Centerpiece Photograph */}
        <div className="relative overflow-hidden border border-[var(--gold-border)] shadow-2xl max-w-2xl mx-auto group">
          <img
            src={activeItem.photoUrl}
            alt={activeItem.title}
            className="w-full h-80 sm:h-[420px] object-cover filter contrast-[1.05]"
          />
          <div className="absolute inset-3 border border-white/10 pointer-events-none" />

          {/* Caption Overlay */}
          <div className="absolute bottom-4 left-4 bg-[#141210]/90 backdrop-blur-md px-3.5 py-1.5 border border-[var(--gold-border)] flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[var(--accent)]" /> {activeItem.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[var(--accent)]" /> {activeItem.location}
            </span>
          </div>
        </div>

        {/* Dual Memory Columns: HER MEMORY vs HIS MEMORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Her Memory */}
          <div className="relative bg-[#1d1916] border border-[var(--gold-border)]/60 p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-3">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-rose-300 font-medium">
                HER MEMORY (Muniza)
              </span>
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
            </div>
            <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] font-light leading-relaxed">
              {activeItem.herMemory}
            </p>
          </div>

          {/* His Memory */}
          <div className="relative bg-[#1d1916] border border-[var(--gold-border)]/60 p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-3">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-amber-200 font-medium">
                HIS MEMORY (Muzamil)
              </span>
              <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
            </div>
            <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] font-light leading-relaxed">
              {activeItem.hisMemory}
            </p>
          </div>
        </div>

        {/* Combined Signature Banner */}
        <div className="text-center p-6 bg-[#13110f] border-t border-b border-[var(--accent)]/50 space-y-1">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-[var(--accent)] block">
            WE BOTH REMEMBER THIS MOMENT
          </span>
          <p className="font-serif text-lg sm:text-xl text-[#f5efe3] font-light italic">
            "{activeItem.sharedMoment}"
          </p>
        </div>
      </motion.div>
    </div>
  );
};
