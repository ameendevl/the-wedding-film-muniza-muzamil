import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Guest, WeddingData } from '../types';
import confetti from 'canvas-confetti';
import { Check, Heart, Users, Utensils, Music, ArrowRight, RotateCcw } from 'lucide-react';

interface ConversationalRSVPProps {
  wedding: WeddingData;
  guest?: Guest | null;
  onRsvpComplete: (updatedGuest: Guest) => void;
}

export const ConversationalRSVP: React.FC<ConversationalRSVPProps> = ({
  wedding,
  guest,
  onRsvpComplete,
}) => {
  // Conversational step:
  // 1: Attendance question
  // 2: Party headcount
  // 3: Dietary & Song preferences
  // 4: Confirmation screen
  const [step, setStep] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>(guest ? guest.name : '');
  const [isAttending, setIsAttending] = useState<boolean | null>(
    guest ? guest.status === 'attending' : null
  );
  const [adults, setAdults] = useState<number>(guest ? guest.adultsCount || 2 : 2);
  const [children, setChildren] = useState<number>(guest ? guest.childrenCount || 0 : 0);
  const [dietary, setDietary] = useState<string>(guest?.dietaryNotes || '');
  const [message, setMessage] = useState<string>(guest?.personalMessage || '');
  const [song, setSong] = useState<string>(guest?.songRequest || '');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c9a96e', '#e6d3a8', '#f5f2eb', '#9e7a40'],
    });
  };

  const handleAttendanceSelect = (attending: boolean) => {
    setIsAttending(attending);
    if (attending) {
      triggerConfetti();
      setStep(2);
    } else {
      // Direct completion for decline
      submitRsvp(false);
      setStep(4);
    }
  };

  const submitRsvp = (attendingStatus: boolean) => {
    const updated: Guest = {
      id: guest ? guest.id : `guest-${Date.now()}`,
      slug: guest ? guest.slug : guestName.toLowerCase().replace(/\s+/g, '-'),
      name: guestName || 'Beloved Guest',
      partyLabel: guest ? guest.partyLabel : guestName,
      invitedEvents: guest ? guest.invitedEvents : ['mehndi', 'baraat', 'walima'],
      status: attendingStatus ? 'attending' : 'declined',
      adultsCount: attendingStatus ? adults : 0,
      childrenCount: attendingStatus ? children : 0,
      dietaryNotes: dietary,
      personalMessage: message,
      songRequest: song,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onRsvpComplete(updated);
  };

  return (
    <section id="rsvp" className="py-28 px-6 relative max-w-3xl mx-auto">
      <div className="border border-[var(--gold-border)] bg-[#151311] p-8 sm:p-14 md:p-16 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
            <Heart className="w-3 h-3 text-[var(--accent)]" />
            Response Requested
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
            CELEBRATE WITH US
          </h2>
          <p className="font-serif italic text-base text-[var(--text-secondary)]">
            Please kindly confirm your presence by 10 December 2026
          </p>
          <div className="w-12 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />
        </div>

        {/* Conversational Interactive Flow */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Attending or Not */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-center"
            >
              {!guest && (
                <div className="max-w-md mx-auto mb-6 text-left">
                  <label className="block text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-2">
                    Your Name or Family
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Tariq Khan & Family"
                    className="w-full bg-[#1c1a17] border border-[var(--gold-border)] px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              )}

              <p className="font-serif italic text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                {guest ? `Welcome, ${guest.name}. Will you be joining us?` : 'Will you be joining us to celebrate?'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handleAttendanceSelect(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#23201b] border border-[var(--gold-border)] hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[#FAF8F5] transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer"
                >
                  Yes, With Joy
                </button>

                <button
                  onClick={() => handleAttendanceSelect(false)}
                  className="w-full sm:w-auto px-8 py-4 border border-[var(--gold-border)]/50 hover:border-[var(--text-muted)] text-xs font-sans tracking-[0.25em] uppercase text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-all duration-300 cursor-pointer"
                >
                  Regretfully Decline
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Headcount */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-center"
            >
              <p className="font-serif italic text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                Wonderful! How many will be celebrating with us?
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-4">
                {/* Adults counter */}
                <div className="border border-[var(--gold-border)]/60 bg-[#1c1a17] p-6 w-48 text-center space-y-3">
                  <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-secondary)] block">
                    Adults
                  </span>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-[var(--gold-border)] text-[var(--accent)] hover:bg-[#2a2622] flex items-center justify-center text-base"
                    >
                      -
                    </button>
                    <span className="font-cinzel text-3xl text-[var(--text-primary)]">{adults}</span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-[var(--gold-border)] text-[var(--accent)] hover:bg-[#2a2622] flex items-center justify-center text-base"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="border border-[var(--gold-border)]/60 bg-[#1c1a17] p-6 w-48 text-center space-y-3">
                  <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-secondary)] block">
                    Children
                  </span>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-[var(--gold-border)] text-[var(--accent)] hover:bg-[#2a2622] flex items-center justify-center text-base"
                    >
                      -
                    </button>
                    <span className="font-cinzel text-3xl text-[var(--text-primary)]">{children}</span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full border border-[var(--gold-border)] text-[var(--accent)] hover:bg-[#2a2622] flex items-center justify-center text-base"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-[#23201b] border border-[var(--gold-border)] hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[#FAF8F5] inline-flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Dietary & Warm Note */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div className="text-center mb-6">
                <p className="font-serif italic text-2xl text-[var(--text-primary)] font-light">
                  A few special touches for your evening
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                    <Utensils className="w-3 h-3 text-[var(--accent)]" />
                    Dietary Restrictions (Optional)
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="e.g. Vegetarian, Nut Allergy, Halal"
                    className="w-full bg-[#1c1a17] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                    <Music className="w-3 h-3 text-[var(--accent)]" />
                    Song Request for the Dance Floor
                  </label>
                  <input
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder="e.g. Pasoori, Afreen Afreen"
                    className="w-full bg-[#1c1a17] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-[var(--accent)]" />
                    A Word of Blessing for the Couple
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a heartfelt message to Muniza & Muzamil..."
                    className="w-full bg-[#1c1a17] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    submitRsvp(true);
                    setStep(4);
                  }}
                  className="px-8 py-3.5 bg-[#23201b] border border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[#FAF8F5] inline-flex items-center gap-2 shadow-xl hover:bg-[#2d2822]"
                >
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                  <span>Confirm RSVP</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-6 text-center py-6"
            >
              <div className="w-16 h-16 rounded-full border border-[var(--gold-border)] bg-[#23201b] mx-auto flex items-center justify-center text-[var(--accent)]">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <h3 className="font-cinzel text-3xl text-[var(--text-primary)] uppercase tracking-[0.15em]">
                  {isAttending ? 'RSVP Confirmed' : 'Response Received'}
                </h3>
                <p className="font-serif italic text-xl text-[var(--accent-light)] font-light max-w-md mx-auto">
                  {isAttending
                    ? `“Wonderful. We cannot wait to celebrate this sacred threshold with you!”`
                    : `“Thank you for letting us know. You will be held dearly in our prayers.”`}
                </p>
              </div>

              {isAttending && (
                <div className="inline-block bg-[#1c1a17] border border-[var(--gold-border)]/60 px-6 py-3 text-xs font-sans tracking-wide text-[var(--text-secondary)]">
                  <span>Celebrating party: </span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {adults} {adults === 1 ? 'Adult' : 'Adults'}
                    {children > 0 ? `, ${children} Children` : ''}
                  </span>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Update your RSVP response</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
