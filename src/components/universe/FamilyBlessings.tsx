import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FamilyBlessingItem } from '../../types/universe';
import { Sparkles, Play, Pause, Volume2, Heart } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface FamilyBlessingsProps {
  blessings: FamilyBlessingItem[];
}

export const FamilyBlessings: React.FC<FamilyBlessingsProps> = ({ blessings }) => {
  const [activeSide, setActiveSide] = useState<'her_family' | 'his_family' | 'friends' | 'special'>('her_family');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredBlessings = blessings.filter((b) => b.side === activeSide);

  const handleToggleVoice = (id: string, duration = 12) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      audioEngine.playVoiceNoteSample(duration, () => setPlayingId(null));
    }
  };

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Words From The People We Love
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          FAMILY BLESSINGS
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Whispered prayers and joyful toasts from those who raised and walked with us.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
        {[
          { key: 'her_family', label: 'Her Family' },
          { key: 'his_family', label: 'His Family' },
          { key: 'friends', label: 'Friends' },
          { key: 'special', label: 'Special Elders' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSide(tab.key as typeof activeSide)}
            className={`px-5 py-2 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
              activeSide === tab.key
                ? 'bg-[var(--accent)] text-black font-semibold shadow-lg'
                : 'border border-[var(--gold-border)] text-[var(--text-secondary)] hover:text-white bg-[#141210]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Blessings Stream */}
      <div className="space-y-6">
        {filteredBlessings.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#171513] border border-[var(--gold-border)] p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[var(--gold-border)]/30 pb-3">
              <div>
                <span className="font-cinzel text-lg text-[#FAF8F5] tracking-wide block">
                  {item.authorName}
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)]">
                  {item.relationship}
                </span>
              </div>
              <Heart className="w-4 h-4 text-[var(--accent)]/60" />
            </div>

            <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] font-light leading-relaxed">
              "{item.message}"
            </p>

            {/* Voice Waveform Player if voice */}
            {item.mediaType === 'voice' && item.voiceWaveform && (
              <div className="pt-4 border-t border-[var(--gold-border)]/30 flex items-center gap-4">
                <button
                  onClick={() => handleToggleVoice(item.id, item.voiceDuration)}
                  className="w-9 h-9 rounded-full bg-[var(--accent)] text-black flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform"
                >
                  {playingId === item.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>

                <div className="flex-1 flex items-center gap-1 h-8">
                  {item.voiceWaveform.map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height * 0.3}px` }}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        playingId === item.id ? 'bg-[var(--accent)]' : 'bg-[var(--gold-border)]'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[10px] font-sans text-[var(--text-muted)] tracking-wider">
                  0:{item.voiceDuration || 45}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
