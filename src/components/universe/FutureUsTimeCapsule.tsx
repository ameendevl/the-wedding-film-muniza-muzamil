import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FutureUsData, FuturePromise } from '../../types/universe';
import { Sparkles, Hourglass, Lock, Unlock, Heart } from 'lucide-react';

interface FutureUsTimeCapsuleProps {
  data: FutureUsData;
}

export const FutureUsTimeCapsule: React.FC<FutureUsTimeCapsuleProps> = ({ data }) => {
  const [selectedPromise, setSelectedPromise] = useState<FuturePromise>(data.promises[0]);

  // Demo toggle to let couple preview the unlocked state or keep it locked
  const [simulatedUnlock, setSimulatedUnlock] = useState<boolean>(false);

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Time Capsule
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          {data.title}
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* Question Selector Strip */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {data.promises.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedPromise(p)}
            className={`px-4 py-2 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
              selectedPromise.id === p.id
                ? 'bg-[var(--accent)] text-black font-semibold shadow-lg'
                : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white bg-[#141210]'
            }`}
          >
            Promise 0{idx + 1}
          </button>
        ))}
      </div>

      {/* Main Time Capsule Card */}
      <motion.div
        key={selectedPromise.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#161412] border border-[var(--gold-border)] p-8 sm:p-14 shadow-2xl space-y-8 overflow-hidden"
      >
        {/* Time Lock Badge */}
        <div className="flex items-center justify-between border-b border-[var(--gold-border)]/40 pb-5">
          <div className="flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)]">
            <Hourglass className="w-4 h-4 animate-pulse" />
            <span>Sealed Until {selectedPromise.unlockDate}</span>
          </div>

          <button
            onClick={() => setSimulatedUnlock(!simulatedUnlock)}
            className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            {simulatedUnlock ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lock Vault</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Couple: Peek Promise</span>
              </>
            )}
          </button>
        </div>

        {/* The Sacred Question */}
        <div className="text-center py-2 space-y-2">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--text-muted)]">
            THE SACRED INQUIRY
          </span>
          <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FAF8F5] font-light tracking-wide">
            "{selectedPromise.question}"
          </h3>
        </div>

        {/* Answers Container (Locked vs Unlocked) */}
        {!simulatedUnlock ? (
          /* Sealed Vault State */
          <div className="border border-dashed border-[var(--gold-border)]/60 bg-[#12100e] p-10 text-center space-y-4 rounded-sm">
            <Lock className="w-8 h-8 text-[var(--accent)] mx-auto opacity-70" />
            <div className="space-y-1">
              <span className="font-cinzel text-lg tracking-wider text-[#FAF8F5] block">
                MEMORIES WAITING IN ETERNITY
              </span>
              <p className="font-serif italic text-sm text-[var(--text-secondary)]">
                Both Muniza and Muzamil have privately sealed their answers into the digital vault.
              </p>
            </div>
            <span className="inline-block text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--accent-light)] pt-2">
              Unlocks on our {selectedPromise.unlockMilestone.replace('_', ' ')} anniversary
            </span>
          </div>
        ) : (
          /* Unlocked State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 pt-4"
          >
            <div className="text-center pb-4">
              <span className="text-xs font-serif italic text-[var(--accent-light)]">
                “You made this promise on your wedding day.”
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Muniza's Answer */}
              <div className="bg-[#1b1815] border border-[var(--gold-border)]/50 p-6 space-y-3">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-rose-300 flex items-center gap-1.5">
                  <Heart className="w-3 h-3 fill-current" />
                  Muniza’s Vow
                </span>
                <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] font-light leading-relaxed">
                  "{selectedPromise.herAnswer}"
                </p>
              </div>

              {/* Muzamil's Answer */}
              <div className="bg-[#1b1815] border border-[var(--gold-border)]/50 p-6 space-y-3">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-amber-200 flex items-center gap-1.5">
                  <Heart className="w-3 h-3 fill-current" />
                  Muzamil’s Vow
                </span>
                <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] font-light leading-relaxed">
                  "{selectedPromise.hisAnswer}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
