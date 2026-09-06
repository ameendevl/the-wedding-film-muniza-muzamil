import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData, Guest, EventId, ThemePalette } from '../types';
import { PRESET_THEMES, extractPaletteFromImage, applyThemeToDOM } from '../services/colorExtractor';
import {
  Users,
  Palette,
  Edit3,
  Dna,
  BookOpen,
  Sparkles,
  CheckCircle,
  Clock,
  XCircle,
  Copy,
  Check,
  Plus,
  Trash2,
  Download,
  Upload,
  QrCode,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminPanelProps {
  wedding: WeddingData;
  onUpdateWedding: (updated: WeddingData) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  wedding,
  onUpdateWedding,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'guests' | 'theme' | 'content' | 'dna' | 'album'
  >('dashboard');

  // Copy link feedback
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New Guest Form Modal
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestAdults, setNewGuestAdults] = useState(2);
  const [newGuestEvents, setNewGuestEvents] = useState<EventId[]>(['mehndi', 'baraat', 'walima']);

  // Guest QR Code Preview
  const [selectedQrGuest, setSelectedQrGuest] = useState<Guest | null>(null);

  // Content form state
  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate);
  const [weddingDisplayDate, setWeddingDisplayDate] = useState(wedding.weddingDisplayDate);
  const [city, setCity] = useState(wedding.city);
  const [filmUrl, setFilmUrl] = useState(wedding.filmVideoUrl);
  const [letterParagraphs, setLetterParagraphs] = useState(wedding.letterText.join('\n\n'));

  // Wedding DNA form state
  const [dnaMet, setDnaMet] = useState(wedding.dna.howWeMet);
  const [dnaProposal, setDnaProposal] = useState(wedding.dna.proposalStory);
  const [dnaSong, setDnaSong] = useState(wedding.dna.favoriteSong);
  const [dnaQuote, setDnaQuote] = useState(wedding.dna.signatureQuote);

  // Calculate Dashboard Metrics
  const totalGuestsInvited = wedding.guests.length;
  const attendingGuests = wedding.guests.filter((g) => g.status === 'attending');
  const declinedGuests = wedding.guests.filter((g) => g.status === 'declined');
  const pendingGuests = wedding.guests.filter((g) => g.status === 'pending');

  const totalAdultsAttending = attendingGuests.reduce((acc, g) => acc + g.adultsCount, 0);
  const totalChildrenAttending = attendingGuests.reduce((acc, g) => acc + g.childrenCount, 0);
  const totalHeadcount = totalAdultsAttending + totalChildrenAttending;

  // Copy Guest URL
  const handleCopyGuestLink = (slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}?guest=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Add Guest
  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;

    const slug = newGuestName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newGuest: Guest = {
      id: `g-${Date.now()}`,
      slug,
      name: newGuestName,
      partyLabel: newGuestName,
      invitedEvents: newGuestEvents,
      status: 'pending',
      adultsCount: newGuestAdults,
      childrenCount: 0,
    };

    const updated = {
      ...wedding,
      guests: [newGuest, ...wedding.guests],
    };
    onUpdateWedding(updated);
    setIsAddGuestOpen(false);
    setNewGuestName('');
  };

  // Delete Guest
  const handleDeleteGuest = (id: string) => {
    const updated = {
      ...wedding,
      guests: wedding.guests.filter((g) => g.id !== id),
    };
    onUpdateWedding(updated);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Status', 'Adults', 'Children', 'Invited Events', 'Dietary', 'Message', 'Song'];
    const rows = wedding.guests.map((g) => [
      `"${g.name}"`,
      g.status,
      g.adultsCount,
      g.childrenCount,
      `"${g.invitedEvents.join(', ')}"`,
      `"${g.dietaryNotes || ''}"`,
      `"${g.personalMessage || ''}"`,
      `"${g.songRequest || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${wedding.slug}-rsvps.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Theme change
  const handleSelectPresetTheme = (preset: ThemePalette) => {
    const updated = { ...wedding, theme: preset };
    onUpdateWedding(updated);
    applyThemeToDOM(preset);
  };

  // Image color extraction
  const handleImageThemeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const dataUrl = uploadEvent.target.result as string;
          const extracted = await extractPaletteFromImage(dataUrl, wedding.theme.mood);
          const updated = { ...wedding, heroPhoto: dataUrl, theme: extracted };
          onUpdateWedding(updated);
          applyThemeToDOM(extracted);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Content changes
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WeddingData = {
      ...wedding,
      brideName,
      groomName,
      initials: `${brideName[0] || 'A'} & ${groomName[0] || 'H'}`,
      weddingDate,
      weddingDisplayDate,
      city,
      filmVideoUrl: filmUrl,
      letterText: letterParagraphs.split('\n\n').filter((p) => p.trim().length > 0),
    };
    onUpdateWedding(updated);
    alert('Wedding content and editorial text updated successfully!');
  };

  // Save DNA changes
  const handleSaveDna = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WeddingData = {
      ...wedding,
      dna: {
        ...wedding.dna,
        howWeMet: dnaMet,
        proposalStory: dnaProposal,
        favoriteSong: dnaSong,
        signatureQuote: dnaQuote,
      },
    };
    onUpdateWedding(updated);
    alert('Wedding DNA & Story personalization updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0c0b] text-[#f5f2eb] overflow-y-auto font-sans">
      {/* Top Admin Navigation */}
      <header className="border-b border-[var(--gold-border)] bg-[#141210] sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[var(--gold-border)] flex items-center justify-center font-cinzel text-xs text-[var(--accent)]">
            {wedding.initials}
          </div>
          <div>
            <h1 className="font-cinzel text-base tracking-wider uppercase text-white">
              COUPLE ADMIN STUDIO
            </h1>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] block">
              {wedding.brideName} & {wedding.groomName} • {wedding.weddingDisplayDate}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-[#1c1916] p-1 border border-[var(--gold-border)]/60 text-xs">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
            { id: 'guests', label: 'Guest & RSVP', icon: Users },
            { id: 'theme', label: 'Theme Studio', icon: Palette },
            { id: 'content', label: 'Content Editor', icon: Edit3 },
            { id: 'dna', label: 'Wedding DNA', icon: Dna },
            { id: 'album', label: 'Keepsake Album', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 flex items-center gap-2 tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#29241e] text-[#FAF8F5] border border-[var(--accent)]/50'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Close Studio Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 border border-[var(--gold-border)] bg-[#1e1a16] hover:bg-[#28231d] text-xs font-sans tracking-[0.2em] uppercase text-[#FAF8F5] transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Exit Studio</span>
        </button>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden flex overflow-x-auto border-b border-[var(--gold-border)] bg-[#141210] p-2 gap-2 text-xs">
        {['dashboard', 'guests', 'theme', 'content', 'dna', 'album'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-3 py-1.5 uppercase tracking-wider shrink-0 ${
              activeTab === tab ? 'border-b-2 border-[var(--accent)] text-white' : 'text-stone-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-10">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-[var(--gold-border)] bg-[#151311] space-y-2">
                <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Confirmed Guests
                </span>
                <div className="font-cinzel text-3xl text-white">
                  {totalHeadcount}{' '}
                  <span className="text-sm font-sans text-[var(--text-secondary)] font-normal">
                    Attending
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  {totalAdultsAttending} Adults • {totalChildrenAttending} Children
                </div>
              </div>

              <div className="p-6 border border-[var(--gold-border)] bg-[#151311] space-y-2">
                <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  RSVP Acceptance Rate
                </span>
                <div className="font-cinzel text-3xl text-emerald-300">
                  {totalGuestsInvited > 0
                    ? Math.round((attendingGuests.length / totalGuestsInvited) * 100)
                    : 0}
                  %
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  {attendingGuests.length} Accepted • {declinedGuests.length} Declined
                </div>
              </div>

              <div className="p-6 border border-[var(--gold-border)] bg-[#151311] space-y-2">
                <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Pending Responses
                </span>
                <div className="font-cinzel text-3xl text-amber-300">
                  {pendingGuests.length}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Awaiting confirmation from parties
                </div>
              </div>

              <div className="p-6 border border-[var(--gold-border)] bg-[#151311] space-y-2">
                <span className="text-[10px] font-sans tracking-luxury uppercase text-[var(--text-muted)] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Memories & Voices
                </span>
                <div className="font-cinzel text-3xl text-white">
                  {wedding.memories.length + wedding.voiceNotes.length}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)]">
                  {wedding.memories.length} Photos/Notes • {wedding.voiceNotes.length} Voice Messages
                </div>
              </div>
            </div>

            {/* Quick Actions & Dietary Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dietary & Special Requests */}
              <div className="border border-[var(--gold-border)] bg-[#151311] p-6 space-y-4">
                <h3 className="font-cinzel text-lg tracking-wider text-white">
                  DIETARY & CATERING NOTES
                </h3>
                <div className="space-y-3">
                  {attendingGuests.filter((g) => g.dietaryNotes).length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] font-serif italic">
                      No special dietary restrictions logged yet.
                    </p>
                  ) : (
                    attendingGuests
                      .filter((g) => g.dietaryNotes)
                      .map((g) => (
                        <div
                          key={g.id}
                          className="p-3 bg-[#1e1a16] border border-white/5 flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-white">{g.name}</span>
                          <span className="text-[var(--accent-light)]">{g.dietaryNotes}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Guest Songs for DJ */}
              <div className="border border-[var(--gold-border)] bg-[#151311] p-6 space-y-4">
                <h3 className="font-cinzel text-lg tracking-wider text-white">
                  DANCE FLOOR PLAYLIST REQUESTS
                </h3>
                <div className="space-y-3">
                  {attendingGuests.filter((g) => g.songRequest).length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] font-serif italic">
                      No song requests submitted yet.
                    </p>
                  ) : (
                    attendingGuests
                      .filter((g) => g.songRequest)
                      .map((g) => (
                        <div
                          key={g.id}
                          className="p-3 bg-[#1e1a16] border border-white/5 flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-white">{g.name}</span>
                          <span className="text-[var(--accent-light)] italic">"{g.songRequest}"</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GUEST MANAGEMENT */}
        {activeTab === 'guests' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-cinzel text-2xl tracking-wider text-white">
                  GUEST LIST & RSVP TRACKER
                </h2>
                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  Generate individualized URLs so guests see only the events they are invited to.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 border border-[var(--gold-border)] bg-[#1b1814] hover:bg-[#25201a] text-xs font-sans tracking-wide text-white inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setIsAddGuestOpen(true)}
                  className="px-4 py-2 bg-[#25201a] border border-[var(--accent)] text-xs font-sans tracking-wide text-white inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Add Guest</span>
                </button>
              </div>
            </div>

            {/* Guest Table */}
            <div className="border border-[var(--gold-border)] bg-[#151311] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1916] text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] border-b border-[var(--gold-border)]">
                  <tr>
                    <th className="py-3 px-4">Guest / Family</th>
                    <th className="py-3 px-4">Events Invited</th>
                    <th className="py-3 px-4">RSVP Status</th>
                    <th className="py-3 px-4">Party Size</th>
                    <th className="py-3 px-4">Personalized Link</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {wedding.guests.map((g) => (
                    <tr key={g.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div>{g.name}</div>
                        {g.personalMessage && (
                          <div className="text-[10px] font-serif italic text-[var(--accent-light)] truncate max-w-xs">
                            "{g.personalMessage}"
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex gap-1 flex-wrap">
                          {g.invitedEvents.map((ev) => (
                            <span
                              key={ev}
                              className="px-1.5 py-0.5 text-[9px] uppercase border border-[var(--gold-border)] bg-[#211d18] text-[var(--accent-light)]"
                            >
                              {ev}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-sans tracking-wide rounded-none ${
                            g.status === 'attending'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                              : g.status === 'declined'
                              ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {g.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {g.status === 'attending' ? (
                          <span>
                            {g.adultsCount} Adults {g.childrenCount > 0 ? `, ${g.childrenCount} Kids` : ''}
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)]">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--text-secondary)]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyGuestLink(g.slug)}
                            className="text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                            title="Copy guest link"
                          >
                            {copiedSlug === g.slug ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Copied!
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" /> ?guest={g.slug}
                              </span>
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedQrGuest(g)}
                          className="p-1 text-[var(--accent)] hover:text-white"
                          title="View Guest QR Code"
                        >
                          <QrCode className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteGuest(g.id)}
                          className="p-1 text-stone-500 hover:text-rose-400"
                          title="Delete guest"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Guest Modal */}
            <AnimatePresence>
              {isAddGuestOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md bg-[#161412] border border-[var(--gold-border)] p-8 shadow-2xl space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-cinzel text-xl text-white uppercase">ADD NEW GUEST</h3>
                      <button onClick={() => setIsAddGuestOpen(false)}>
                        <X className="w-5 h-5 text-stone-400" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateGuest} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                          Guest or Family Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newGuestName}
                          onChange={(e) => setNewGuestName(e.target.value)}
                          placeholder="e.g. Usman Farooq & Family"
                          className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                          Expected Adult Headcount
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={newGuestAdults}
                          onChange={(e) => setNewGuestAdults(parseInt(e.target.value) || 1)}
                          className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-2">
                          Invited Events
                        </label>
                        <div className="space-y-2">
                          {(['mehndi', 'baraat', 'walima'] as EventId[]).map((ev) => (
                            <label key={ev} className="flex items-center gap-2 text-stone-300">
                              <input
                                type="checkbox"
                                checked={newGuestEvents.includes(ev)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewGuestEvents([...newGuestEvents, ev]);
                                  } else {
                                    setNewGuestEvents(newGuestEvents.filter((item) => item !== ev));
                                  }
                                }}
                                className="accent-[var(--accent)]"
                              />
                              <span className="uppercase tracking-wider">{ev}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddGuestOpen(false)}
                          className="px-4 py-2 uppercase tracking-wider text-stone-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#25201a] border border-[var(--accent)] text-white uppercase tracking-wider"
                        >
                          Save Guest
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Guest QR Code Preview Modal */}
            <AnimatePresence>
              {selectedQrGuest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-sm paper-texture text-[#1f1d19] p-8 shadow-2xl embossed-border text-center space-y-4"
                  >
                    <button
                      onClick={() => setSelectedQrGuest(null)}
                      className="absolute top-4 right-4 text-stone-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <span className="font-cinzel text-xs tracking-widest text-[#937138] uppercase block">
                      Individual Guest QR
                    </span>
                    <h4 className="font-cinzel text-xl text-[#1e1c19] uppercase">
                      {selectedQrGuest.name}
                    </h4>
                    <p className="font-serif italic text-xs text-[#5c5447]">
                      Scan to open the personalized invitation for {selectedQrGuest.name}.
                    </p>

                    <div className="p-4 bg-white border border-[#c5ab73] inline-block shadow-inner">
                      <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" fill="white" />
                        <rect x="10" y="10" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                        <rect x="17" y="17" width="11" height="11" fill="#1f1d19" />
                        <rect x="65" y="10" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                        <rect x="72" y="17" width="11" height="11" fill="#1f1d19" />
                        <rect x="10" y="65" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                        <rect x="17" y="72" width="11" height="11" fill="#1f1d19" />
                        <rect x="44" y="20" width="8" height="8" fill="#937138" />
                        <rect x="44" y="44" width="16" height="16" fill="#1f1d19" />
                        <rect x="68" y="44" width="8" height="8" fill="#937138" />
                        <rect x="20" y="48" width="12" height="8" fill="#1f1d19" />
                        <rect x="44" y="70" width="14" height="14" fill="#937138" />
                        <rect x="68" y="72" width="16" height="8" fill="#1f1d19" />
                      </svg>
                    </div>

                    <div className="text-[10px] font-mono text-stone-600">
                      ?guest={selectedQrGuest.slug}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TAB 3: THEME STUDIO */}
        {activeTab === 'theme' && (
          <div className="space-y-10">
            <div>
              <h2 className="font-cinzel text-2xl tracking-wider text-white">
                DYNAMIC THEME STUDIO
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Upload your main photograph to automatically extract sophisticated muted tones, or choose from curated editorial palettes.
              </p>
            </div>

            {/* Photo Upload & Extraction */}
            <div className="border border-[var(--gold-border)] bg-[#151311] p-8 space-y-6">
              <h3 className="font-cinzel text-lg tracking-wider text-white">
                EXTRACT PALETTE FROM HERO PHOTOGRAPH
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-64 h-44 overflow-hidden border border-[var(--gold-border)] relative group">
                  <img
                    src={wedding.heroPhoto}
                    alt="Current hero"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-sans tracking-widest uppercase text-white">
                      Active Photo
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold-border)] bg-[#211d18] hover:border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-white cursor-pointer shadow">
                    <Upload className="w-4 h-4 text-[var(--accent)]" />
                    <span>Upload New Couple Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageThemeUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-[var(--text-muted)] font-serif italic max-w-md">
                    Our color engine automatically samples photographic pixel values and calculates harmonious background, text, accent, and gold borders without oversaturated neon hues.
                  </p>
                </div>
              </div>
            </div>

            {/* Curated Presets */}
            <div className="border border-[var(--gold-border)] bg-[#151311] p-8 space-y-6">
              <h3 className="font-cinzel text-lg tracking-wider text-white">
                CURATED EDITORIAL PRESETS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(PRESET_THEMES).map((preset) => {
                  const isSelected = wedding.theme.id === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPresetTheme(preset)}
                      className={`p-5 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] shadow-2xl bg-[#1e1a16]'
                          : 'border-[var(--gold-border)]/50 hover:border-[var(--gold-border)] bg-[#171412]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-cinzel text-sm text-white tracking-wide">
                          {preset.name}
                        </h4>
                        {isSelected && (
                          <span className="text-[9px] uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)] px-1.5 py-0.5">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Swatches */}
                      <div className="flex items-center gap-2 h-7 mb-4">
                        <div
                          className="flex-1 h-full border border-white/10"
                          style={{ backgroundColor: preset.bgPrimary }}
                          title="Background"
                        />
                        <div
                          className="flex-1 h-full border border-white/10"
                          style={{ backgroundColor: preset.bgSecondary }}
                          title="Surface"
                        />
                        <div
                          className="flex-1 h-full border border-white/10"
                          style={{ backgroundColor: preset.accent }}
                          title="Accent"
                        />
                        <div
                          className="flex-1 h-full border border-white/10"
                          style={{ backgroundColor: preset.gold }}
                          title="Gold"
                        />
                      </div>

                      <span className="text-[10px] font-sans tracking-wide text-stone-400 uppercase">
                        Mood: {preset.mood}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTENT & STORY EDITOR */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent} className="space-y-8 max-w-3xl">
            <div>
              <h2 className="font-cinzel text-2xl tracking-wider text-white">
                EDITORIAL CONTENT EDITOR
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Customize wedding names, dates, emotional letter, and cinema video links without touching code.
              </p>
            </div>

            <div className="border border-[var(--gold-border)] bg-[#151311] p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                    Wedding Display Date
                  </label>
                  <input
                    type="text"
                    value={weddingDisplayDate}
                    onChange={(e) => setWeddingDisplayDate(e.target.value)}
                    className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  Wedding Film Video URL (MP4 / WebM / CDN)
                </label>
                <input
                  type="text"
                  value={filmUrl}
                  onChange={(e) => setFilmUrl(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  "A Letter From Us" Text (separate paragraphs with blank lines)
                </label>
                <textarea
                  rows={6}
                  value={letterParagraphs}
                  onChange={(e) => setLetterParagraphs(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 p-3 text-white text-xs font-serif leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#24201b] border border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-white shadow hover:bg-[#2c2620]"
              >
                Save Content Changes
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: WEDDING DNA */}
        {activeTab === 'dna' && (
          <form onSubmit={handleSaveDna} className="space-y-8 max-w-3xl">
            <div>
              <h2 className="font-cinzel text-2xl tracking-wider text-white">
                WEDDING DNA PERSONALIZATION
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Tell the platform your personal love story nuances to weave bespoke microcopy throughout the site.
              </p>
            </div>

            <div className="border border-[var(--gold-border)] bg-[#151311] p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  How Did You Meet?
                </label>
                <input
                  type="text"
                  value={dnaMet}
                  onChange={(e) => setDnaMet(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  The Proposal Story
                </label>
                <textarea
                  rows={3}
                  value={dnaProposal}
                  onChange={(e) => setDnaProposal(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 p-3 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  Favorite Song / Anthem
                </label>
                <input
                  type="text"
                  value={dnaSong}
                  onChange={(e) => setDnaSong(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-wide uppercase text-stone-400 mb-1">
                  Signature Love Quote
                </label>
                <input
                  type="text"
                  value={dnaQuote}
                  onChange={(e) => setDnaQuote(e.target.value)}
                  className="w-full bg-[#1f1b17] border border-[var(--gold-border)]/60 px-3 py-2 text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#24201b] border border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-white shadow hover:bg-[#2c2620]"
              >
                Save Wedding DNA
              </button>
            </div>
          </form>
        )}

        {/* TAB 6: DIGITAL KEEPSAKE ALBUM EXPORT */}
        {activeTab === 'album' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-cinzel text-2xl tracking-wider text-white">
                  PRINTABLE DIGITAL WEDDING ALBUM
                </h2>
                <p className="text-xs text-[var(--text-secondary)] font-sans">
                  A high-resolution editorial keepsake book containing your story, vows, event memories, and family notes.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#25201a] border border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-white inline-flex items-center gap-2 cursor-pointer shadow"
              >
                <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Print / Save as PDF Album</span>
              </button>
            </div>

            {/* Album Book Preview */}
            <div className="paper-texture text-[#1f1c19] p-8 sm:p-14 border border-[#c5ab73] shadow-2xl max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-2 border-b border-[#c5ab73]/40 pb-8">
                <span className="font-cinzel text-xs tracking-widest text-[#937138] uppercase">
                  Permanent Digital Heirloom
                </span>
                <h3 className="font-cinzel text-4xl uppercase tracking-[0.15em] text-[#1e1c19]">
                  {wedding.brideName} & {wedding.groomName}
                </h3>
                <p className="font-serif italic text-sm text-[#5c5447]">
                  {wedding.weddingDisplayDate} • {wedding.city}, {wedding.country}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img
                  src={wedding.heroPhoto}
                  alt="Couple"
                  className="w-full h-80 object-cover border border-[#c5ab73]/60 shadow"
                />
                <div className="space-y-4">
                  <h4 className="font-cinzel text-lg tracking-wider text-[#1e1c19]">
                    THE SACRED THRESHOLD
                  </h4>
                  <p className="font-serif italic text-sm text-[#453e34] leading-relaxed">
                    "{wedding.dna.signatureQuote}"
                  </p>
                  <p className="font-serif text-xs text-[#5c5447] leading-relaxed">
                    {wedding.letterText[0]}
                  </p>
                </div>
              </div>

              {/* Memory excerpts */}
              <div className="pt-8 border-t border-[#c5ab73]/40 space-y-4">
                <h4 className="font-cinzel text-base tracking-wider uppercase text-center text-[#1e1c19]">
                  EXCERPTS FROM OUR LOVED ONES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wedding.memories.slice(0, 4).map((m) => (
                    <div key={m.id} className="p-4 bg-white/70 border border-[#c5ab73]/30 text-xs">
                      <p className="font-serif italic text-[#38332b]">"{m.message}"</p>
                      <span className="font-cinzel text-[10px] text-[#937138] block mt-2">
                        — {m.guestName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
