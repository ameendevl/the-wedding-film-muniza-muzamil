import React, { useState } from 'react';
import { LifecycleMode } from '../types';
import { Clock, Shield, Sparkles, ChevronUp, ChevronDown, UserCheck } from 'lucide-react';

interface LifecycleSwitcherProps {
  lifecycle: LifecycleMode;
  onSelectLifecycle: (mode: LifecycleMode) => void;
  onOpenAdmin: () => void;
  onSelectGuestQuick: (slug: string) => void;
}

export const LifecycleSwitcher: React.FC<LifecycleSwitcherProps> = ({
  lifecycle,
  onSelectLifecycle,
  onOpenAdmin,
  onSelectGuestQuick,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const modes: { id: LifecycleMode; label: string; desc: string }[] = [
    { id: 'before', label: '1. Before Wedding', desc: 'Invitation & RSVP Focus' },
    { id: 'day', label: '2. Wedding Day', desc: 'Today is the Day & Live Schedule' },
    { id: 'after', label: '3. After Wedding', desc: 'Permanent Heirloom Archive' },
    { id: 'anniversary', label: '4. Anniversary', desc: 'One Year Ago Resurface' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Floating Pill Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--gold-border)] bg-[#171513]/90 backdrop-blur-md shadow-2xl text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent-light)] hover:border-[var(--accent)] transition-all cursor-pointer"
        title="Simulate wedding date evolution & guest experiences"
      >
        <Clock className="w-3 h-3 text-[var(--accent)]" />
        <span className="hidden sm:inline">Simulate Timeline:</span>
        <span className="text-[var(--text-primary)] font-medium">
          {lifecycle.toUpperCase()}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>

      {/* Expanded Simulator Drawer */}
      {isExpanded && (
        <div className="absolute top-10 right-0 w-80 bg-[#171513]/95 backdrop-blur-xl border border-[var(--gold-border)] p-4 shadow-2xl space-y-4 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--gold-border)]/40">
            <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--accent)] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Dynamic Timeline Simulator
            </span>
            <span className="text-[9px] text-[var(--text-muted)] font-sans">Live preview</span>
          </div>

          {/* Mode options */}
          <div className="space-y-1.5">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelectLifecycle(m.id);
                  setIsExpanded(false);
                }}
                className={`w-full text-left p-2 transition-colors border cursor-pointer ${
                  lifecycle === m.id
                    ? 'bg-[#25211c] border-[var(--accent)] text-[#FAF8F5]'
                    : 'border-transparent hover:bg-white/5 text-[var(--text-secondary)]'
                }`}
              >
                <div className="text-xs font-sans font-medium">{m.label}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-sans">{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Guest Simulation shortcuts */}
          <div className="pt-2 border-t border-[var(--gold-border)]/40 space-y-2">
            <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] block flex items-center gap-1">
              <UserCheck className="w-3 h-3" />
              Preview as Specific Guest:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[9px] font-sans">
              <button
                onClick={() => {
                  onSelectGuestQuick('ahmed-family');
                  setIsExpanded(false);
                }}
                className="px-2 py-1 bg-[#221e1a] border border-[var(--gold-border)]/50 hover:border-[var(--accent)] text-[var(--text-primary)]"
              >
                Ahmed (All 3 Events)
              </button>
              <button
                onClick={() => {
                  onSelectGuestQuick('zain-malik');
                  setIsExpanded(false);
                }}
                className="px-2 py-1 bg-[#221e1a] border border-[var(--gold-border)]/50 hover:border-[var(--accent)] text-[var(--text-primary)]"
              >
                Zain (Baraat + Walima)
              </button>
              <button
                onClick={() => {
                  onSelectGuestQuick('fatima-khalid');
                  setIsExpanded(false);
                }}
                className="px-2 py-1 bg-[#221e1a] border border-[var(--gold-border)]/50 hover:border-[var(--accent)] text-[var(--text-primary)]"
              >
                Fatima (Walima Only)
              </button>
            </div>
          </div>

          {/* Couple Admin Studio Access */}
          <div className="pt-2 border-t border-[var(--gold-border)]/40">
            <button
              onClick={() => {
                setIsExpanded(false);
                onOpenAdmin();
              }}
              className="w-full py-2 bg-[#25201a] border border-[var(--gold-border)] hover:border-[var(--accent)] text-[10px] font-sans tracking-luxury uppercase text-[var(--accent-light)] flex items-center justify-center gap-1.5 shadow"
            >
              <Shield className="w-3 h-3 text-[var(--accent)]" />
              <span>Couple Admin Studio</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
