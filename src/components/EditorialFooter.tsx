import React from 'react';
import { WeddingData } from '../types';
import { Heart, ArrowUp } from 'lucide-react';

interface EditorialFooterProps {
  wedding: WeddingData;
  onOpenAdmin: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({
  wedding,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--gold-border)]/60 bg-[#0d0c0b] py-20 px-6 relative text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border border-[var(--gold-border)] mx-auto flex items-center justify-center text-[var(--accent)] font-cinzel text-sm">
          {wedding.initials}
        </div>

        {/* Names */}
        <div className="space-y-2">
          <h3 className="font-cinzel text-3xl sm:text-4xl text-[#FAF8F5] tracking-[0.18em] uppercase font-light">
            {wedding.brideName} & {wedding.groomName}
          </h3>
          <p className="font-serif italic text-sm text-[var(--text-secondary)]">
            {wedding.weddingDisplayDate} • {wedding.city}, {wedding.country}
          </p>
        </div>

        <p className="font-serif italic text-xs text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
          “May this digital memory live on as a testament to the love, blessings, and sacred promises witnessed by those we cherish most.”
        </p>

        {/* Links & Back to top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans tracking-wide text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <span>The Wedding Film</span>
            <span>•</span>
            <span className="text-[var(--accent)] font-serif italic">A Digital Heirloom Experience</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[10px] tracking-[0.2em] uppercase hover:text-[var(--accent)] transition-colors"
            >
              Couple Studio
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase hover:text-[#FAF8F5] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-[var(--accent)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
