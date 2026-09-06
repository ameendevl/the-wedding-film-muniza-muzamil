import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '../types';
import { Sparkles, X, Heart } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface TactileInvitationProps {
  wedding: WeddingData;
}

export const TactileInvitation: React.FC<TactileInvitationProps> = ({ wedding }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const envelopeRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt states
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [shinePos, setShinePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!envelopeRef.current) return;
    const rect = envelopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 9; // Tilt up to 9 deg
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShinePos({ x: 50, y: 50 });
  };

  const handleOpenInvitation = () => {
    audioEngine.playChime();
    setIsOpen(true);
  };

  return (
    <section className="py-28 px-6 relative max-w-4xl mx-auto text-center">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-14 space-y-3"
      >
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          The Formal Summons
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          THE ROYAL INVITATION
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)]">
          Tilt to catch the light • Tap the wax seal to unseal the parchment
        </p>
      </motion.div>

      {/* Interactive 3D Envelope Container */}
      <div className="relative flex justify-center items-center py-6 perspective-[1000px]">
        <motion.div
          ref={envelopeRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full max-w-lg cursor-pointer select-none"
          onClick={handleOpenInvitation}
        >
          {/* Closed Envelope Body */}
          <div className="relative bg-[#1c1a17] border border-[var(--gold-border)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-8 sm:p-12 text-center rounded-none overflow-hidden group">
            {/* Dynamic Gold Foil Sheen overlay following cursor */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(230, 210, 160, 0.22) 0%, rgba(201, 169, 110, 0.08) 35%, transparent 70%)`,
              }}
            />

            {/* Corner Filigrees */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[var(--accent)]/60" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[var(--accent)]/60" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[var(--accent)]/60" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[var(--accent)]/60" />

            {/* Diagonal envelope fold lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="200" y2="130" stroke="currentColor" strokeWidth="1" />
                <line x1="400" y1="0" x2="200" y2="130" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="260" x2="200" y2="130" stroke="currentColor" strokeWidth="1" />
                <line x1="400" y1="260" x2="200" y2="130" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Couple Calligraphy on Envelope Face */}
            <div className="py-8 space-y-4 relative z-10">
              <span className="font-serif italic text-lg sm:text-xl text-[var(--text-secondary)] block">
                To our honored guest
              </span>
              <span className="font-cinzel text-2xl sm:text-3xl tracking-[0.2em] text-[#FAF8F5] block uppercase drop-shadow-md">
                {wedding.brideName} & {wedding.groomName}
              </span>
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[var(--text-muted)]">
                {wedding.city} • {wedding.weddingDisplayDate}
              </span>
            </div>

            {/* 3D Wax Seal with Monogram & Breathing Pulse */}
            <div className="relative z-20 flex justify-center -mb-4 mt-2">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 4 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8a242d] via-[#66181f] to-[#380b0f] border-2 border-[#b8434c] shadow-[0_10px_25px_rgba(100,20,30,0.6)] flex flex-col items-center justify-center text-white"
              >
                {/* Expanding Wax Seal Aura */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full border border-[#d9534f]/50 pointer-events-none"
                />

                <span className="font-cinzel text-xs tracking-widest font-semibold text-[#fce4e6] drop-shadow-md">
                  {wedding.initials}
                </span>
                <span className="text-[7px] tracking-widest uppercase text-[#fce4e6]/90 mt-0.5 font-bold">
                  UNSEAL
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Unfolded Tactile Invitation Card Modal / Reveal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40, rotateX: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl my-8 paper-texture text-[#211e1a] p-8 sm:p-14 shadow-2xl embossed-border text-center select-none overflow-hidden"
            >
              {/* Shimmer line sweeping through parchment upon opening */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 text-[#665f54] hover:text-[#1e1c18] p-2 transition-colors cursor-pointer rounded-full hover:bg-black/5"
                title="Close invitation"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Embossed Corner Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#b89354]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#b89354]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#b89354]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#b89354]" />

              {/* Bismillah Calligraphy */}
              <div className="mb-8 space-y-1">
                <span className="font-serif text-2xl sm:text-3xl text-[#5a482b] block tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <span className="text-[10px] tracking-[0.25em] font-sans text-[#786c5a] uppercase block">
                  In the Name of God, the Most Gracious, the Most Merciful
                </span>
              </div>

              {/* Main Invitation Text */}
              <div className="space-y-6">
                <p className="font-serif italic text-base sm:text-lg text-[#5a5247] leading-relaxed">
                  Together with their families,
                </p>

                <div className="space-y-2 py-2">
                  <h3 className="font-cinzel text-3xl sm:text-4xl text-[#1e1c19] tracking-[0.15em] uppercase font-light">
                    {wedding.brideName}
                  </h3>
                  <span className="font-script text-3xl text-[#b89354] block">&</span>
                  <h3 className="font-cinzel text-3xl sm:text-4xl text-[#1e1c19] tracking-[0.15em] uppercase font-light">
                    {wedding.groomName}
                  </h3>
                </div>

                <p className="font-serif text-base sm:text-lg text-[#5a5247] leading-relaxed max-w-md mx-auto">
                  request the pleasure of your company to celebrate the auspicious occasion of their wedding ceremonies and joyous union.
                </p>

                {/* Event summary lines */}
                <div className="pt-6 border-t border-[#d9c187]/60 space-y-2">
                  <div className="text-xs font-sans tracking-[0.25em] text-[#786c5a] uppercase font-semibold">
                    {wedding.weddingDisplayDate}
                  </div>
                  <div className="font-serif italic text-sm text-[#474136]">
                    {wedding.city}, {wedding.country}
                  </div>
                </div>

                {/* Monogram Seal on Card */}
                <div className="pt-4 flex justify-center items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#b89354]" />
                  <div className="w-10 h-10 rounded-full border border-[#b89354] flex items-center justify-center text-[#b89354] font-cinzel text-xs font-semibold">
                    {wedding.initials}
                  </div>
                  <Heart className="w-3.5 h-3.5 text-[#b89354]" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
