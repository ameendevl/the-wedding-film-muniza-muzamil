import React, { useState, useEffect } from 'react';
import { WeddingData, LifecycleMode, Guest, MemoryPost, VoiceNote } from './types';
import { MUNIZA_MUZAMIL_WEDDING, SEED_WEDDINGS } from './data/seedData';
import { applyThemeToDOM } from './services/colorExtractor';

// Components
import { PrologueIntro } from './components/PrologueIntro';
import { EditorialNavbar } from './components/EditorialNavbar';
import { PersonalizedGuestBanner } from './components/PersonalizedGuestBanner';
import { HeroSection } from './components/HeroSection';
import { CountdownClock } from './components/CountdownClock';
import { WeddingDaySchedule } from './components/WeddingDaySchedule';
import { AnniversaryResurface } from './components/AnniversaryResurface';
import { StoryTimeline } from './components/StoryTimeline';
import { LoveLetter } from './components/LoveLetter';
import { TactileInvitation } from './components/TactileInvitation';
import { EventsSection } from './components/EventsSection';
import { WeddingFilmSection } from './components/WeddingFilmSection';
import { PhotoGallery } from './components/PhotoGallery';
import { VoiceGuestbook } from './components/VoiceGuestbook';
import { GuestMemoryWall } from './components/GuestMemoryWall';
import { ConversationalRSVP } from './components/ConversationalRSVP';
import { EditorialFooter } from './components/EditorialFooter';
import { AudioController } from './components/AudioController';
import { LifecycleSwitcher } from './components/LifecycleSwitcher';
import { AdminPanel } from './components/AdminPanel';
import { GoldenParticles } from './components/GoldenParticles';
import { OurLittleUniverseModal } from './components/universe/OurLittleUniverseModal';

export const App: React.FC = () => {
  // 1. Multi-Tenant Wedding Data
  const [wedding, setWedding] = useState<WeddingData>(() => {
    // Check URL query param ?wedding=slug
    const urlParams = new URLSearchParams(window.location.search);
    const weddingSlug = urlParams.get('wedding');
    if (weddingSlug && SEED_WEDDINGS[weddingSlug]) {
      return SEED_WEDDINGS[weddingSlug];
    }
    // Check localStorage
    const saved = localStorage.getItem('the_wedding_film_data');
    if (saved) {
      try {
        const savedStr = saved.replaceAll('"/images/', '"./images/');
        const parsed = JSON.parse(savedStr);
        if (parsed.brideName === 'Areeba' || !parsed.brideName) {
          parsed.brideName = 'Muniza';
          parsed.groomName = 'Muzamil';
          parsed.initials = 'M & M';
        }
        if (parsed.city !== 'Karachi' || parsed.weddingDate !== '2026-12-25') {
          parsed.city = 'Karachi';
          parsed.weddingDate = '2026-12-25';
          parsed.weddingDisplayDate = '25 December 2026';
          parsed.events = MUNIZA_MUZAMIL_WEDDING.events;
          parsed.timeline = MUNIZA_MUZAMIL_WEDDING.timeline;
          parsed.letterText = MUNIZA_MUZAMIL_WEDDING.letterText;
          parsed.dna = MUNIZA_MUZAMIL_WEDDING.dna;
        }
        localStorage.setItem('the_wedding_film_data', JSON.stringify(parsed));
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved wedding data', e);
      }
    }
    return MUNIZA_MUZAMIL_WEDDING;
  });

  // 2. Active Guest resolution
  const [activeGuest, setActiveGuest] = useState<Guest | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestSlug = urlParams.get('guest');
    if (guestSlug) {
      const match = wedding.guests.find((g) => g.slug === guestSlug);
      return match || null;
    }
    return null;
  });

  // 3. UI States
  const [enteredPrologue, setEnteredPrologue] = useState<boolean>(false);
  const [lifecycle, setLifecycle] = useState<LifecycleMode>('before');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isUniverseOpen, setIsUniverseOpen] = useState<boolean>(false);

  // Apply Theme CSS variables on load and whenever wedding theme changes
  useEffect(() => {
    applyThemeToDOM(wedding.theme);
  }, [wedding.theme]);

  // Persist wedding state updates
  const handleUpdateWedding = (updated: WeddingData) => {
    setWedding(updated);
    localStorage.setItem('the_wedding_film_data', JSON.stringify(updated));
  };

  // Add memory post
  const handleAddMemory = (memory: MemoryPost) => {
    const updated = {
      ...wedding,
      memories: [memory, ...wedding.memories],
    };
    handleUpdateWedding(updated);
  };

  // Add voice note
  const handleAddVoiceNote = (note: VoiceNote) => {
    const updated = {
      ...wedding,
      voiceNotes: [note, ...wedding.voiceNotes],
    };
    handleUpdateWedding(updated);
  };

  // Update guest RSVP
  const handleRsvpComplete = (updatedGuest: Guest) => {
    const existingIndex = wedding.guests.findIndex((g) => g.id === updatedGuest.id);
    let newGuestsList = [...wedding.guests];
    if (existingIndex >= 0) {
      newGuestsList[existingIndex] = updatedGuest;
    } else {
      newGuestsList = [updatedGuest, ...newGuestsList];
    }

    const updated = {
      ...wedding,
      guests: newGuestsList,
    };
    handleUpdateWedding(updated);
    setActiveGuest(updatedGuest);
  };

  // Handle Quick Guest Simulator Switch
  const handleSelectGuestQuick = (slug: string) => {
    const found = wedding.guests.find((g) => g.slug === slug);
    if (found) {
      setActiveGuest(found);
      const url = new URL(window.location.href);
      url.searchParams.set('guest', slug);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleClearGuest = () => {
    setActiveGuest(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('guest');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent)] selection:text-black relative">
      {/* Ambient Cinematic Golden Bokeh Particles */}
      <GoldenParticles density={35} />

      {/* 1. Cinematic Movie Prologue Sequence */}
      {!enteredPrologue && (
        <PrologueIntro
          wedding={wedding}
          onEnter={() => setEnteredPrologue(true)}
        />
      )}

      {/* 2. Personalized Guest Notification Banner */}
      {activeGuest && (
        <PersonalizedGuestBanner
          guest={activeGuest}
          onClearGuest={handleClearGuest}
        />
      )}

      {/* 3. Editorial Minimal Sticky Navbar */}
      <EditorialNavbar
        wedding={wedding}
        lifecycle={lifecycle}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenUniverse={() => setIsUniverseOpen(true)}
      />

      {/* 4. Hero Section with Typography & Parallax Motion */}
      <HeroSection wedding={wedding} lifecycle={lifecycle} />

      {/* 5. Dynamic Countdown Clock (Transitions Automatically on Day/Past) */}
      <CountdownClock
        weddingDateStr={wedding.weddingDate}
        displayDate={wedding.weddingDisplayDate}
        lifecycle={lifecycle}
      />

      {/* Couple Private World Gateway Banner */}
      <section className="py-10 px-6 max-w-5xl mx-auto text-center">
        <div className="relative bg-[#161412] border border-[var(--gold-border)] p-8 sm:p-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden group hover:border-[var(--accent)] transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center sm:text-left space-y-2 relative z-10">
            <span className="text-[10px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
              Private Sanctuary for Muniza & Muzamil
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF8F5] tracking-wider uppercase font-light">
              OUR LITTLE UNIVERSE
            </h3>
            <p className="font-serif italic text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-lg">
              Two Hearts, Why I Chose You, Secret Letters, Open When, and Future Us.
            </p>
          </div>
          <button
            onClick={() => setIsUniverseOpen(true)}
            className="relative z-10 shrink-0 px-7 py-3.5 bg-[var(--accent)] text-black font-semibold text-xs font-sans tracking-luxury uppercase hover:bg-white transition-all shadow-[0_0_25px_rgba(201,169,110,0.35)] cursor-pointer"
          >
            Enter Sanctuary ✦
          </button>
        </div>
      </section>

      {/* 6. Day-of Mode: Live Ceremony Schedule & Concierge (if lifecycle is day) */}
      {lifecycle === 'day' && <WeddingDaySchedule wedding={wedding} />}

      {/* 7. Anniversary Mode: "ONE YEAR AGO TODAY" Resurface (if lifecycle is anniversary) */}
      {lifecycle === 'anniversary' && <AnniversaryResurface wedding={wedding} />}

      {/* 8. Story Timeline ("HOW IT ALL BEGAN") */}
      <div id="story">
        <StoryTimeline timeline={wedding.timeline} />
      </div>

      {/* 9. A Letter From Us */}
      <div id="letter">
        <LoveLetter
          wedding={wedding}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>

      {/* 10. Interactive Tactile Digital Invitation with 3D Wax Seal */}
      <div id="invitation">
        <TactileInvitation wedding={wedding} />
      </div>

      {/* 11. Wedding Events Panels (Mehndi, Baraat, Walima with Maps & Calendar) */}
      <EventsSection events={wedding.events} guest={activeGuest} />

      {/* 12. Wedding Film 4K Cinema Player */}
      <WeddingFilmSection
        filmUrl={wedding.filmVideoUrl}
        brideName={wedding.brideName}
        groomName={wedding.groomName}
      />

      {/* 13. Curated Editorial Photography Masonry Gallery */}
      <PhotoGallery />

      {/* 14. Voice Guestbook ("MESSAGES FROM THE PEOPLE WE LOVE" with real microphone recording) */}
      <VoiceGuestbook
        voiceNotes={wedding.voiceNotes}
        onAddVoiceNote={handleAddVoiceNote}
      />

      {/* 15. Guest Memory Wall & Reception Table QR Code Generator */}
      <GuestMemoryWall
        memories={wedding.memories}
        onAddMemory={handleAddMemory}
      />

      {/* 16. Conversational Multi-Step RSVP Flow with Confetti */}
      <ConversationalRSVP
        wedding={wedding}
        guest={activeGuest}
        onRsvpComplete={handleRsvpComplete}
      />

      {/* 17. Editorial Keepsake Footer */}
      <EditorialFooter
        wedding={wedding}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 18. Ambient Audio Engine Controller */}
      <AudioController />

      {/* 19. Interactive Simulation & Lifecycle Switcher Toolbar */}
      <LifecycleSwitcher
        lifecycle={lifecycle}
        onSelectLifecycle={(m) => setLifecycle(m)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectGuestQuick={handleSelectGuestQuick}
      />

      {/* 20. Couple Admin Studio Modal */}
      {isAdminOpen && (
        <AdminPanel
          wedding={wedding}
          onUpdateWedding={handleUpdateWedding}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* 21. Our Little Universe — Private Couple Sanctuary */}
      <OurLittleUniverseModal
        isOpen={isUniverseOpen}
        onClose={() => setIsUniverseOpen(false)}
      />
    </div>
  );
};

export default App;
