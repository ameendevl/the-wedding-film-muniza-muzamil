import React from 'react';
import { Guest } from '../types';
import { Sparkles, Calendar, CheckCircle } from 'lucide-react';

interface PersonalizedGuestBannerProps {
  guest: Guest;
  onClearGuest: () => void;
}

export const PersonalizedGuestBanner: React.FC<PersonalizedGuestBannerProps> = ({
  guest,
  onClearGuest,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-[#161411]/95 backdrop-blur-md border-b border-[var(--gold-border)] px-4 py-2.5 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <span className="text-xs font-sans tracking-wide text-[var(--text-secondary)]">
            Welcome, <strong className="text-[var(--text-primary)] font-medium">{guest.name}</strong>.
            Your personalized itinerary includes{' '}
            <span className="text-[var(--accent-light)] font-serif italic text-sm">
              {guest.invitedEvents.map((e) => e.toUpperCase()).join(' + ')}
            </span>
            .
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#events"
            className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] hover:underline underline-offset-4"
          >
            View Events
          </a>
          <span className="text-[var(--gold-border)]">•</span>
          <a
            href="#rsvp"
            className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] hover:underline underline-offset-4"
          >
            {guest.status === 'attending' ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-3 h-3" /> RSVP Confirmed
              </span>
            ) : (
              'Respond to RSVP'
            )}
          </a>
          <span className="text-[var(--gold-border)]">•</span>
          <button
            onClick={onClearGuest}
            className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-white"
            title="Switch to general view"
          >
            General View
          </button>
        </div>
      </div>
    </div>
  );
};
