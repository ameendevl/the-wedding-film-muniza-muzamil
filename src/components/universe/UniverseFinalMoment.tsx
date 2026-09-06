import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const UniverseFinalMoment: React.FC = () => {
  return (
    <section className="py-36 px-6 relative max-w-4xl mx-auto text-center overflow-hidden">
      {/* Subtle warm glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5 }}
        className="relative z-10 space-y-12"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto"
        />

        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[var(--text-secondary)] font-light leading-relaxed"
          >
            "This is not just where our wedding happened."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[var(--text-secondary)] font-light leading-relaxed"
          >
            "This is where we kept the moments that made us..."
          </motion.p>
        </div>

        {/* The word "US." with dramatic scale and golden aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="py-4"
        >
          <span className="font-cinzel text-6xl sm:text-8xl md:text-9xl text-[#FAF8F5] tracking-[0.25em] font-extralight block uppercase drop-shadow-[0_0_25px_rgba(201,169,110,0.35)]">
            US.
          </span>
        </motion.div>

        <div className="space-y-2 pt-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6 }}
            className="font-sans text-xs sm:text-sm tracking-[0.35em] uppercase text-[var(--accent)]"
          >
            Forever starts with a day.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.9 }}
            className="font-serif italic text-base sm:text-lg text-[var(--text-muted)] font-light"
          >
            But our story doesn't end there.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.2 }}
          className="pt-8 flex items-center justify-center gap-3 text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--accent-light)]"
        >
          <Heart className="w-3.5 h-3.5 fill-current text-[var(--accent)]" />
          <span>Muniza & Muzamil • The Living Heirloom</span>
          <Heart className="w-3.5 h-3.5 fill-current text-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
