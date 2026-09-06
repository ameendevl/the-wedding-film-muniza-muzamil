import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WeddingData, LifecycleMode } from '../types';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  wedding: WeddingData;
  lifecycle: LifecycleMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ wedding, lifecycle }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Cinematic Slow Zoom */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[125%] -top-[12%] pointer-events-none"
      >
        <div
          className="w-full h-full bg-cover bg-center filter brightness-[0.42] contrast-[1.08] animate-slow-zoom"
          style={{ backgroundImage: `url(${wedding.heroPhoto})` }}
        />
        {/* Soft editorial gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/70 via-transparent to-[var(--bg-primary)]/70" />

        {/* Ambient warm film light orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none" />
      </motion.div>

      {/* Editorial Content Layout */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24 flex flex-col items-center"
      >
        {/* Subtitle tag with animated lines */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 36 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-[var(--accent)]/60"
          />
          <span className="text-[11px] md:text-xs font-sans tracking-[0.38em] text-[var(--accent-light)] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[var(--accent)]" />
            {lifecycle === 'after'
              ? 'THE PERMANENT ARCHIVE'
              : lifecycle === 'day'
              ? 'THE DAY HAS ARRIVED'
              : lifecycle === 'anniversary'
              ? 'ANOTHER YEAR OF US'
              : wedding.heroTagline}
          </span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 36 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-[var(--accent)]/60"
          />
        </motion.div>

        {/* Large Editorial Names Stack with Staggered Character Mask Entrance */}
        <div className="space-y-2 mb-10 overflow-hidden">
          {/* Bride Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.18em] font-light text-[#FAF8F5] uppercase leading-none drop-shadow-md select-none"
            >
              {wedding.brideName}
            </motion.h1>
          </div>

          {/* Script Ampersand with gentle float */}
          <div className="flex items-center justify-center py-2 overflow-hidden">
            <motion.span
              initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-script text-4xl sm:text-5xl md:text-6xl text-[var(--accent)] font-normal px-4 drop-shadow-[0_0_15px_rgba(201,169,110,0.35)]"
            >
              &
            </motion.span>
          </div>

          {/* Groom Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.18em] font-light text-[#FAF8F5] uppercase leading-none drop-shadow-md select-none"
            >
              {wedding.groomName}
            </motion.h1>
          </div>
        </div>

        {/* Details bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-[var(--gold-border)]/60 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-sans tracking-[0.25em] text-[var(--text-secondary)] uppercase"
        >
          <span className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
            {wedding.weddingDisplayDate}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40" />
          <span className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
            {wedding.city}, {wedding.country}
          </span>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] cursor-pointer hover:text-[var(--accent)] transition-colors"
          onClick={() => {
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
          }}
        >
          <span>Scroll to Experience</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--accent)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
