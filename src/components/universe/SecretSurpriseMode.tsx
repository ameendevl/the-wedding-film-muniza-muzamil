import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecretSurpriseItem, PartnerRole } from '../../types/universe';
import { Sparkles, Lock, Plus, Heart, Eye } from 'lucide-react';
import { isDateUnlocked } from '../../services/universeStorage';

interface SecretSurpriseModeProps {
  surprises: SecretSurpriseItem[];
  currentRole: PartnerRole;
}

export const SecretSurpriseMode: React.FC<SecretSurpriseModeProps> = ({
  surprises,
  currentRole,
}) => {
  const [selectedSurprise, setSelectedSurprise] = useState<SecretSurpriseItem | null>(null);

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Hidden Threshold
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          SECRET SURPRISE VAULT
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Private treasures prepared in secret, sealed until destiny strikes the clock.
        </p>
      </div>

      {/* Surprises Cards */}
      <div className="space-y-6">
        {surprises.map((item) => {
          const isCreator = item.createdByRole === currentRole;
          const unlocked = isDateUnlocked(item.revealDate);

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="bg-[#171513] border border-[var(--gold-border)] p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-3 text-xs font-sans tracking-[0.2em] uppercase">
                <span className="text-[var(--accent)]">
                  Created by {item.createdByRole === 'bride' ? 'Muniza' : 'Muzamil'} for{' '}
                  {item.targetRole === 'bride' ? 'Muniza' : 'Muzamil'}
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Lock className="w-3.5 h-3.5" />
                  🔒 Hidden until {item.revealDate}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-[#FAF8F5] font-normal">
                {item.title}
              </h3>

              {!isCreator && !unlocked ? (
                /* Recipient View Before Reveal Date */
                <div className="bg-[#12100e] border border-dashed border-[var(--gold-border)]/40 p-6 text-center space-y-2">
                  <Lock className="w-6 h-6 text-amber-300/80 mx-auto" />
                  <p className="font-serif italic text-sm text-[var(--text-secondary)]">
                    This content is strictly encrypted and will automatically reveal itself on {item.revealDate}.
                  </p>
                  <span className="text-[10px] font-sans uppercase text-[var(--accent)] tracking-widest block">
                    Shhh... No peeking! 🤍
                  </span>
                </div>
              ) : (
                /* Creator or Unlocked View */
                <div className="space-y-4 pt-2">
                  <div className="p-5 bg-[#141210] border-l-2 border-[var(--accent)]">
                    <p className="font-serif italic text-base text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                      "{item.letter}"
                    </p>
                  </div>

                  {item.photos && item.photos.length > 0 && (
                    <div className="flex gap-4 pt-2">
                      {item.photos.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt="Surprise"
                          className="w-32 h-24 object-cover border border-[var(--gold-border)]"
                        />
                      ))}
                    </div>
                  )}

                  {isCreator && (
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[var(--text-muted)] uppercase block">
                      ✓ As the creator, you can see this preview. Your partner will only see it on {item.revealDate}.
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
