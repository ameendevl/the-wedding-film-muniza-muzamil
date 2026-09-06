import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OurFirstMilestone } from '../../types/universe';
import { Sparkles, Calendar, MapPin, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';

interface OurFirstsTimelineProps {
  firsts: OurFirstMilestone[];
}

export const OurFirstsTimeline: React.FC<OurFirstsTimelineProps> = ({ firsts }) => {
  const [selectedFirst, setSelectedFirst] = useState<OurFirstMilestone>(firsts[0]);

  return (
    <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Milestones of Us
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          OUR FIRSTS
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          The quiet beginnings that built an unshakeable lifetime together.
        </p>
      </div>

      {/* Horizontal Carousel Ribbon */}
      <div className="relative mb-12">
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
          {firsts.map((item, index) => {
            const isSelected = selectedFirst.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedFirst(item)}
                className={`snap-start shrink-0 text-left p-5 border transition-all duration-300 w-56 sm:w-64 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1e1b17] border-[var(--accent)] shadow-[0_0_20px_rgba(201,169,110,0.25)]'
                    : 'bg-[#141210] border-[var(--gold-border)] hover:border-[var(--accent)]/50'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
                  <span>0{index + 1}</span>
                  <span className="text-[var(--text-muted)]">{item.date.split('•')[0]}</span>
                </div>
                <h4 className="font-cinzel text-sm sm:text-base text-[#FAF8F5] tracking-wider uppercase font-light line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="font-serif italic text-xs text-[var(--text-secondary)] line-clamp-2">
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Cinematic Selected Milestone View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFirst.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#161412] border border-[var(--gold-border)] p-8 sm:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Milestone Image if available */}
          <div className="lg:col-span-5">
            {selectedFirst.photoUrl ? (
              <div className="relative overflow-hidden border border-[var(--gold-border)] shadow-xl group">
                <img
                  src={selectedFirst.photoUrl}
                  alt={selectedFirst.title}
                  className="w-full h-72 sm:h-96 object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-2 border border-white/10 pointer-events-none" />
              </div>
            ) : (
              <div className="h-72 sm:h-96 border border-dashed border-[var(--gold-border)]/40 bg-[#12100e] flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Sparkles className="w-8 h-8 text-[var(--accent)] opacity-60" />
                <span className="font-serif italic text-sm text-[var(--text-secondary)]">
                  A memory etched into our hearts forever
                </span>
              </div>
            )}
          </div>

          {/* Milestone Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--accent)] block">
                SACRED MILESTONE
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl text-[#FAF8F5] tracking-wide uppercase font-light">
                {selectedFirst.title}
              </h3>
              <p className="font-serif italic text-base text-[var(--accent-light)]">
                {selectedFirst.subtitle}
              </p>
            </div>

            {/* Story Paragraph */}
            <p className="font-serif text-lg sm:text-xl text-[#dfd7c9] font-light leading-relaxed tracking-wide">
              "{selectedFirst.story}"
            </p>

            {/* Badges Bar */}
            <div className="pt-4 border-t border-[var(--gold-border)]/40 flex flex-wrap items-center gap-6 text-xs font-sans tracking-[0.2em] text-[var(--text-secondary)] uppercase">
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                {selectedFirst.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                {selectedFirst.location}
              </span>
              {selectedFirst.voiceDurationSec && (
                <span className="flex items-center gap-2 text-emerald-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  Voice Note ({selectedFirst.voiceDurationSec}s)
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
