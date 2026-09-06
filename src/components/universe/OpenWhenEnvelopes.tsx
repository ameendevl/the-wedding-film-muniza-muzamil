import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OpenWhenEnvelope } from '../../types/universe';
import { Sparkles, Lock, X, Plus, Heart, Calendar } from 'lucide-react';
import { unsealOpenWhenEnvelope, addOpenWhenEnvelope } from '../../services/universeStorage';
import { audioEngine } from '../../services/audioEngine';

interface OpenWhenEnvelopesProps {
  envelopes: OpenWhenEnvelope[];
  onUpdate?: () => void;
}

export const OpenWhenEnvelopes: React.FC<OpenWhenEnvelopesProps> = ({
  envelopes,
  onUpdate,
}) => {
  const [selectedEnv, setSelectedEnv] = useState<OpenWhenEnvelope | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // New envelope form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');

  const handleOpenEnvelope = (env: OpenWhenEnvelope) => {
    if (env.isLocked && env.unlockDate) {
      const now = new Date().getTime();
      const target = new Date(env.unlockDate + 'T00:00:00').getTime();
      if (now < target) {
        alert(`This envelope is sealed until ${env.unlockDate}. Be patient my love! 🤍`);
        return;
      }
    }

    audioEngine.playChime();
    unsealOpenWhenEnvelope(env.id);
    setSelectedEnv({ ...env, isLocked: false });
    onUpdate?.();
  };

  const handleCreateEnvelope = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newEnv: OpenWhenEnvelope = {
      id: `custom-ow-${Date.now()}`,
      title: title.trim().toUpperCase(),
      subtitle: subtitle.trim() || 'A private reminder from my heart',
      category: 'custom',
      recipientRole: 'both',
      message: message.trim(),
      unlockDate: unlockDate || undefined,
      isLocked: !!unlockDate,
      waxSealColor: '#a43b44',
    };

    addOpenWhenEnvelope(newEnv);
    setTitle('');
    setSubtitle('');
    setMessage('');
    setUnlockDate('');
    setIsCreating(false);
    onUpdate?.();
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          For Every Mood, Season & Tear
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          OPEN WHEN...
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Envelopes sealed with love, meant to be opened only when the moment arrives.
        </p>
      </div>

      {/* Grid of Physical Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {envelopes.map((env) => (
          <motion.div
            key={env.id}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            onClick={() => handleOpenEnvelope(env)}
            className="relative bg-[#1a1714] border border-[var(--gold-border)] p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[240px] group cursor-pointer overflow-hidden select-none hover:border-[var(--accent)]"
          >
            {/* Top envelope triangle fold decorative line */}
            <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
                <line x1="200" y1="0" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Lock or Wax Seal Badge */}
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[var(--accent)]">
                {env.isLocked ? 'TIME-LOCKED' : 'SEALED ENVELOPE'}
              </span>

              {env.isLocked ? (
                <div className="w-7 h-7 rounded-full bg-[#291717] border border-red-500/40 flex items-center justify-center text-red-300">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div
                  className="w-7 h-7 rounded-full border border-white/20 shadow-md flex items-center justify-center text-white text-[9px] font-cinzel font-bold"
                  style={{ backgroundColor: env.waxSealColor }}
                >
                  M
                </div>
              )}
            </div>

            {/* Envelope Title */}
            <div className="py-4 space-y-1 relative z-10">
              <h3 className="font-cinzel text-lg sm:text-xl text-[#FAF8F5] tracking-wider uppercase leading-snug group-hover:text-[var(--accent-light)] transition-colors">
                {env.title}
              </h3>
              <p className="font-serif italic text-xs text-[var(--text-secondary)] line-clamp-2">
                {env.subtitle}
              </p>
            </div>

            {/* Bottom Interaction indicator */}
            <div className="pt-3 border-t border-[var(--gold-border)]/30 flex items-center justify-between text-[10px] font-sans tracking-luxury uppercase text-[var(--text-muted)]">
              {env.unlockDate ? (
                <span className="flex items-center gap-1 text-amber-300/80">
                  <Calendar className="w-3 h-3" /> {env.unlockDate}
                </span>
              ) : (
                <span>Ready to Unseal</span>
              )}
              <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                Break Seal →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Custom Envelope Trigger */}
      <div className="mt-12 text-center">
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)]/50 hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] hover:text-white transition-all cursor-pointer bg-[#171412]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a Custom “Open When...” Envelope</span>
          </button>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreateEnvelope}
            className="max-w-lg mx-auto bg-[#171512] border border-[var(--gold-border)] p-8 text-left space-y-4 shadow-2xl"
          >
            <h4 className="font-cinzel text-base text-[var(--accent)] tracking-wider uppercase">
              New Sealed Envelope
            </h4>

            <div>
              <label className="text-[10px] font-sans tracking-widest text-[var(--text-muted)] uppercase block mb-1">
                Envelope Title (e.g. OPEN WHEN YOU ARE WORRIED)
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="OPEN WHEN..."
                className="w-full bg-[#12100e] border border-[var(--gold-border)] px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-[10px] font-sans tracking-widest text-[var(--text-muted)] uppercase block mb-1">
                Subtitle / Intention
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="For a quiet evening when you need reassurance"
                className="w-full bg-[#12100e] border border-[var(--gold-border)] px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-[10px] font-sans tracking-widest text-[var(--text-muted)] uppercase block mb-1">
                Letter Message
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heart out..."
                className="w-full bg-[#12100e] border border-[var(--gold-border)] px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)] font-serif"
              />
            </div>

            <div>
              <label className="text-[10px] font-sans tracking-widest text-[var(--text-muted)] uppercase block mb-1">
                Optional Lock Date (Leave blank to unlock immediately)
              </label>
              <input
                type="date"
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                className="w-full bg-[#12100e] border border-[var(--gold-border)] px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-xs font-sans uppercase text-[var(--text-muted)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--accent)] text-black text-xs font-sans tracking-luxury uppercase font-medium"
              >
                Seal This Envelope
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Unfolded Envelope Content Modal */}
      <AnimatePresence>
        {selectedEnv && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg my-8 paper-texture text-[#211e1a] p-8 sm:p-12 shadow-2xl embossed-border select-none"
            >
              <button
                onClick={() => setSelectedEnv(null)}
                className="absolute top-4 right-4 text-[#665f54] hover:text-[#1e1c18] p-2 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6 space-y-1">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#786c5a] block">
                  A MESSAGE FROM MY SOUL
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl text-[#1e1c19] tracking-wider uppercase font-light">
                  {selectedEnv.title}
                </h3>
                <p className="font-serif italic text-xs text-[#786c5a]">
                  {selectedEnv.subtitle}
                </p>
              </div>

              {/* Photo if present */}
              {selectedEnv.imageUrl && (
                <div className="mb-6 overflow-hidden border border-[#d9c187]">
                  <img
                    src={selectedEnv.imageUrl}
                    alt={selectedEnv.title}
                    className="w-full h-48 object-cover filter contrast-[1.05]"
                  />
                </div>
              )}

              {/* Message */}
              <div className="font-serif text-lg sm:text-xl text-[#363028] leading-relaxed italic tracking-wide font-light border-t border-b border-[#d9c187]/60 py-6 my-6">
                "{selectedEnv.message}"
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 text-xs font-sans tracking-[0.2em] text-[#786c5a] uppercase">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-[#b89354] text-[#b89354]" />
                  Muniza & Muzamil
                </span>
                <button
                  onClick={() => setSelectedEnv(null)}
                  className="text-[10px] underline underline-offset-4 cursor-pointer hover:text-[#1e1c19]"
                >
                  Close & Keep Safe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
