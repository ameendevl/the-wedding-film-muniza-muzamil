import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecretLetter, PartnerRole } from '../../types/universe';
import { Mail, Sparkles, X, Lock, CheckCircle2, Heart } from 'lucide-react';
import { unsealLetter } from '../../services/universeStorage';
import { audioEngine } from '../../services/audioEngine';

interface SecretLettersProps {
  letters: SecretLetter[];
  currentRole: PartnerRole;
  onUpdate?: () => void;
}

export const SecretLetters: React.FC<SecretLettersProps> = ({
  letters,
  currentRole,
  onUpdate,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<SecretLetter | null>(null);

  const handleOpenLetter = (letter: SecretLetter) => {
    audioEngine.playChime();
    unsealLetter(letter.id);
    setSelectedLetter({ ...letter, isSealed: false });
    onUpdate?.();
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Sealed Words
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          A LETTER FOR YOU
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Private letters written for specific thresholds of our sacred journey.
        </p>
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {letters.map((letter) => {
          const isForMe = letter.recipientRole === currentRole;
          const senderName = letter.senderRole === 'bride' ? 'Muniza' : 'Muzamil';

          return (
            <motion.div
              key={letter.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#161412] border border-[var(--gold-border)] p-8 shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer hover:border-[var(--accent)] transition-all overflow-hidden"
              onClick={() => handleOpenLetter(letter)}
            >
              {/* Paper Corner Embellishment */}
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[var(--accent)]/50" />
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[var(--accent)]/50" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent)]">
                  <span>From {senderName}</span>
                  {letter.isSealed ? (
                    <span className="flex items-center gap-1 text-amber-300">
                      <Lock className="w-3 h-3" /> Sealed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Opened
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-light)] transition-colors">
                  {letter.title}
                </h3>

                <p className="font-serif italic text-sm text-[var(--text-secondary)] font-light">
                  {letter.unlockCondition === 'wedding_day'
                    ? 'To be opened on the wedding morning'
                    : letter.unlockCondition === 'first_anniversary'
                    ? 'To be opened on our first anniversary'
                    : 'To be read whenever your heart desires'}
                </p>
              </div>

              {/* Interaction Strip */}
              <div className="pt-4 border-t border-[var(--gold-border)]/40 flex items-center justify-between">
                <span className="text-xs font-serif italic text-[var(--text-muted)]">
                  Someone left you a letter.
                </span>
                <span className="px-4 py-1.5 bg-[#1f1a16] border border-[var(--accent)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all font-medium">
                  {letter.isSealed ? 'Open It →' : 'Read Again →'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unsealed Physical Paper Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 35, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl my-8 paper-texture text-[#211e1a] p-8 sm:p-14 shadow-2xl embossed-border select-none"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 text-[#665f54] hover:text-[#1e1c18] p-2 transition-colors cursor-pointer rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Embossed Corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#b89354]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#b89354]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#b89354]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#b89354]" />

              {/* Letter Header */}
              <div className="text-center mb-8 border-b border-[#d9c187]/60 pb-6">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#786c5a] block mb-2">
                  A SACRED KEEPSAKE
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#1e1c19] tracking-wide font-light">
                  {selectedLetter.title}
                </h3>
              </div>

              {/* Letter Content Body */}
              <div className="font-serif text-lg sm:text-xl text-[#363028] leading-relaxed whitespace-pre-line tracking-wide font-light">
                {selectedLetter.content}
              </div>

              {/* Closing Signatures */}
              <div className="pt-8 mt-8 border-t border-[#d9c187]/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#786c5a] uppercase">
                  <Heart className="w-3.5 h-3.5 fill-[#b89354] text-[#b89354]" />
                  <span>Held in Our Sacred Archive</span>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-4 py-1.5 border border-[#b89354] text-[10px] font-sans tracking-[0.2em] uppercase text-[#5a482b] hover:bg-[#b89354] hover:text-white transition-all"
                >
                  Fold Paper & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
