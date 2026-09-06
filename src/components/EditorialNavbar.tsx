import React, { useState, useEffect } from 'react';
import { WeddingData, LifecycleMode } from '../types';
import { Shield, Menu, X, Sparkles } from 'lucide-react';

interface EditorialNavbarProps {
  wedding: WeddingData;
  lifecycle: LifecycleMode;
  onOpenAdmin: () => void;
  onOpenUniverse?: () => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({
  wedding,
  lifecycle,
  onOpenAdmin,
  onOpenUniverse,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#story', label: 'Story' },
    { href: '#letter', label: 'Letter' },
    { href: '#invitation', label: 'Invitation' },
    { href: '#events', label: 'Events' },
    { href: '#film', label: 'Film' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#voice-guestbook', label: 'Voice Keepsake' },
    { href: '#memories', label: 'Guest Archive' },
    { href: '#rsvp', label: 'RSVP' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
        scrolled
          ? 'bg-[#12100e]/95 backdrop-blur-md border-b border-[var(--gold-border)]/60 py-3 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Monogram / Names */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          title="Back to Top"
        >
          <div className="w-8 h-8 rounded-full border border-[var(--gold-border)] flex items-center justify-center font-cinzel text-xs text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            {wedding.initials}
          </div>
          <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#FAF8F5]">
            {wedding.brideName} <span className="text-[var(--accent)]">&</span> {wedding.groomName}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-sans tracking-[0.25em] uppercase text-[var(--text-secondary)]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[var(--accent-light)] transition-colors relative py-1 hover:border-b border-[var(--accent)]/50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs: Our Little Universe & Studio */}
        <div className="flex items-center gap-2.5">
          {onOpenUniverse && (
            <button
              onClick={onOpenUniverse}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--accent)] bg-[#1e1a16] text-[10px] font-sans tracking-luxury uppercase text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(201,169,110,0.3)] font-semibold"
              title="Enter Our Little Universe — Private Sanctuary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
              <span>Our Universe ✦</span>
            </button>
          )}

          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[var(--gold-border)]/60 hover:border-[var(--accent)] bg-[#1a1714]/80 text-[10px] font-sans tracking-luxury uppercase text-[var(--accent-light)] transition-all cursor-pointer"
            title="Open Couple Studio"
          >
            <Shield className="w-3 h-3 text-[var(--accent)]" />
            <span>Studio</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#141210]/98 border-b border-[var(--gold-border)] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-xs font-sans tracking-[0.25em] uppercase text-[var(--text-secondary)]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 hover:text-[var(--accent)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            {onOpenUniverse && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenUniverse();
                }}
                className="w-full py-2.5 bg-[var(--accent)] text-black font-semibold text-xs font-sans tracking-luxury uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enter Our Little Universe ✦</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 bg-[#201c18] border border-[var(--gold-border)] text-xs font-sans tracking-luxury uppercase text-[var(--accent-light)] flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Couple Admin Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
