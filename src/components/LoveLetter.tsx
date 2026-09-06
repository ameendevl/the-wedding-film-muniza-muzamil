import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../types';
import { Feather, Heart } from 'lucide-react';

interface LoveLetterProps {
  wedding: WeddingData;
  onOpenAdmin?: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ wedding, onOpenAdmin }) => {
  return (
    <section className="py-32 px-6 relative max-w-4xl mx-auto overflow-hidden">
      {/* Background Monogram Watermark with Slow Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <motion.span
          animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-cinzel text-[180px] md:text-[280px] text-[var(--accent)] select-none"
        >
          {wedding.initials}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#151311] border border-[var(--gold-border)] p-8 sm:p-14 md:p-20 shadow-2xl space-y-12 group hover:border-[var(--accent)]/50 transition-colors duration-700"
      >
        {/* Embossed Corner Flourishes */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[var(--accent)]/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[var(--accent)]/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[var(--accent)]/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[var(--accent)]/60" />

        {/* Header Tag with Quill animation */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase">
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Feather className="w-4 h-4 text-[var(--accent)]" />
            </motion.div>
            <span>A Letter From Us</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
            TO OUR LOVED ONES
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-16 h-[1px] bg-[var(--accent)] mx-auto mt-4"
          />
        </div>

        {/* Letter Body with Staggered Paragraph Inviews */}
        <div className="space-y-6 max-w-2xl mx-auto text-center font-serif text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] font-light leading-relaxed">
          {wedding.letterText.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="tracking-wide"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Couple Signatures & Wax Seal Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-8 border-t border-[var(--gold-border)]/40 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] block mb-1">
              {wedding.letterClosing}
            </span>
            <span className="font-script text-3xl sm:text-5xl text-[var(--accent)] drop-shadow-[0_0_12px_rgba(201,169,110,0.3)]">
              {wedding.brideName} & {wedding.groomName}
            </span>
          </div>

          {/* Stamp / Monogram Emblem with rotating ring */}
          <div className="relative w-16 h-16 rounded-full border border-[var(--gold-border)] bg-[#1d1a16] flex items-center justify-center shadow-inner group-hover:border-[var(--accent)] transition-colors">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-1 rounded-full border border-dashed border-[var(--accent)]/30 pointer-events-none"
            />
            <span className="font-cinzel text-xs text-[var(--accent)] tracking-widest font-semibold">
              {wedding.initials}
            </span>
          </div>
        </motion.div>

        {/* Edit Button for Couple */}
        {onOpenAdmin && (
          <div className="text-center pt-2">
            <button
              onClick={onOpenAdmin}
              className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Couple: Edit this letter in Studio →
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};
