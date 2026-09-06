import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CoupleUniverseData, PartnerRole } from '../../types/universe';
import { getUniverseData } from '../../services/universeStorage';
import { audioEngine } from '../../services/audioEngine';

// Subcomponents
import { TwoHeartsStories } from './TwoHeartsStories';
import { WhyIChoseYou } from './WhyIChoseYou';
import { SecretLetters } from './SecretLetters';
import { OpenWhenEnvelopes } from './OpenWhenEnvelopes';
import { FutureUsTimeCapsule } from './FutureUsTimeCapsule';
import { WhenWeAreOld } from './WhenWeAreOld';
import { OurFirstsTimeline } from './OurFirstsTimeline';
import { OnePhotoTwoMemories } from './OnePhotoTwoMemories';
import { WeddingDay24Hours } from './WeddingDay24Hours';
import { FamilyBlessings } from './FamilyBlessings';
import { DoYouRememberSurprise } from './DoYouRememberSurprise';
import { SecretSurpriseMode } from './SecretSurpriseMode';
import { UniverseFinalMoment } from './UniverseFinalMoment';

import { X, Sparkles, Heart, Lock, KeyRound, Volume2, VolumeX } from 'lucide-react';

interface OurLittleUniverseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UniverseTab =
  | 'two_hearts'
  | 'why_chose_you'
  | 'secret_letters'
  | 'open_when'
  | 'future_us'
  | 'when_old'
  | 'our_firsts'
  | 'photo_memories'
  | 'wedding_day'
  | 'blessings'
  | 'remember'
  | 'surprise';

export const OurLittleUniverseModal: React.FC<OurLittleUniverseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<CoupleUniverseData>(() => getUniverseData());
  const [currentRole, setCurrentRole] = useState<PartnerRole>('bride');
  const [activeTab, setActiveTab] = useState<UniverseTab>('two_hearts');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for seamless couple experience, with role switch
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Reload data whenever tab changes or modal opens
  const refreshData = () => {
    setData(getUniverseData());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const toggleMusic = () => {
    const playing = audioEngine.toggleAmbient();
    setIsAudioPlaying(playing);
  };

  if (!isOpen) return null;

  const navItems: { id: UniverseTab; label: string; icon?: string }[] = [
    { id: 'two_hearts', label: 'Two Hearts' },
    { id: 'why_chose_you', label: 'Why I Chose You' },
    { id: 'secret_letters', label: 'Secret Letters' },
    { id: 'open_when', label: 'Open When...' },
    { id: 'future_us', label: 'Future Us' },
    { id: 'when_old', label: 'When We’re Old' },
    { id: 'our_firsts', label: 'Our Firsts' },
    { id: 'photo_memories', label: 'One Photo, Two Memories' },
    { id: 'wedding_day', label: '24 Hours' },
    { id: 'blessings', label: 'Family Blessings' },
    { id: 'remember', label: 'Do You Remember?' },
    { id: 'surprise', label: 'Secret Surprise' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#100e0c] text-[#f7f4ee] overflow-y-auto selection:bg-[var(--accent)] selection:text-black">
        {/* Top Minimal Sanctuary Header */}
        <header className="sticky top-0 z-40 bg-[#12100e]/95 backdrop-blur-md border-b border-[var(--gold-border)]/60 px-6 py-4 flex items-center justify-between shadow-2xl">
          {/* Brand & Partner Role Switcher */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-[var(--gold-border)] flex items-center justify-center font-cinzel text-xs text-[var(--accent)]">
              M²
            </div>
            <div>
              <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase text-[#FAF8F5] block font-light">
                OUR LITTLE UNIVERSE
              </span>
              <span className="text-[10px] font-sans tracking-[0.25em] text-[var(--accent)] uppercase block">
                Muniza & Muzamil • Private Sanctuary
              </span>
            </div>
          </div>

          {/* Center Role Toggle: Muniza ❤️ vs Muzamil 🤍 */}
          <div className="hidden sm:flex items-center gap-2 bg-[#191613] p-1 border border-[var(--gold-border)]/60 rounded-full text-xs">
            <button
              onClick={() => setCurrentRole('bride')}
              className={`px-3 py-1 rounded-full transition-all text-[11px] font-sans tracking-wide cursor-pointer ${
                currentRole === 'bride'
                  ? 'bg-rose-900/60 text-rose-200 font-medium border border-rose-500/40 shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              Viewing as Muniza ❤️
            </button>
            <button
              onClick={() => setCurrentRole('groom')}
              className={`px-3 py-1 rounded-full transition-all text-[11px] font-sans tracking-wide cursor-pointer ${
                currentRole === 'groom'
                  ? 'bg-amber-900/60 text-amber-200 font-medium border border-amber-500/40 shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              Viewing as Muzamil 🤍
            </button>
          </div>

          {/* Right Controls: Ambient Music & Close */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMusic}
              className="p-2 border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer rounded-full"
              title={isAudioPlaying ? 'Mute Soundtrack' : 'Play Cinematic Ambience'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-[var(--accent)] animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
              title="Return to Public Wedding Film"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Cinematic Sanctuary Navigation Ribbon */}
        <nav className="sticky top-[65px] z-30 bg-[#141210]/95 backdrop-blur-md border-b border-[var(--gold-border)]/30 px-6 py-2 overflow-x-auto no-scrollbar shadow-md">
          <div className="max-w-6xl mx-auto flex items-center gap-2 sm:gap-4 min-w-max">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === item.id
                    ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Body Area */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'two_hearts' && (
              <motion.div
                key="two_hearts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <TwoHeartsStories data={data.twoHearts} />
              </motion.div>
            )}

            {activeTab === 'why_chose_you' && (
              <motion.div
                key="why_chose_you"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <WhyIChoseYou data={data.whyIChoseYou} onUpdate={refreshData} />
              </motion.div>
            )}

            {activeTab === 'secret_letters' && (
              <motion.div
                key="secret_letters"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <SecretLetters
                  letters={data.secretLetters}
                  currentRole={currentRole}
                  onUpdate={refreshData}
                />
              </motion.div>
            )}

            {activeTab === 'open_when' && (
              <motion.div
                key="open_when"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <OpenWhenEnvelopes
                  envelopes={data.openWhenEnvelopes}
                  onUpdate={refreshData}
                />
              </motion.div>
            )}

            {activeTab === 'future_us' && (
              <motion.div
                key="future_us"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <FutureUsTimeCapsule data={data.futureUs} />
              </motion.div>
            )}

            {activeTab === 'when_old' && (
              <motion.div
                key="when_old"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <WhenWeAreOld data={data.whenWeAreOld} />
              </motion.div>
            )}

            {activeTab === 'our_firsts' && (
              <motion.div
                key="our_firsts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <OurFirstsTimeline firsts={data.ourFirsts} />
              </motion.div>
            )}

            {activeTab === 'photo_memories' && (
              <motion.div
                key="photo_memories"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <OnePhotoTwoMemories items={data.onePhotoTwoMemories} />
              </motion.div>
            )}

            {activeTab === 'wedding_day' && (
              <motion.div
                key="wedding_day"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <WeddingDay24Hours
                  timeline={data.weddingDay24Hours}
                  weddingDateStr={data.weddingDate}
                />
              </motion.div>
            )}

            {activeTab === 'blessings' && (
              <motion.div
                key="blessings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <FamilyBlessings blessings={data.familyBlessings} />
              </motion.div>
            )}

            {activeTab === 'remember' && (
              <motion.div
                key="remember"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <DoYouRememberSurprise surprises={data.memorySurprises} />
              </motion.div>
            )}

            {activeTab === 'surprise' && (
              <motion.div
                key="surprise"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <SecretSurpriseMode
                  surprises={data.secretSurprises}
                  currentRole={currentRole}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Module 21: The Final Emotional Signature Outro */}
          <div className="pt-20 border-t border-[var(--gold-border)]/30 mt-20">
            <UniverseFinalMoment />
          </div>
        </main>
      </div>
    </AnimatePresence>
  );
};
