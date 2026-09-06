import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryPost, EventId } from '../types';
import { Sparkles, QrCode, Upload, Heart, X, Check, Image as ImageIcon } from 'lucide-react';

interface GuestMemoryWallProps {
  memories: MemoryPost[];
  onAddMemory: (memory: MemoryPost) => void;
}

export const GuestMemoryWall: React.FC<GuestMemoryWallProps> = ({
  memories,
  onAddMemory,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  // Form state
  const [guestName, setGuestName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<'all' | EventId | 'family' | 'friends'>('all');
  const [previewImage, setPreviewImage] = useState<string>('./images/mehndi.jpg');

  const filteredMemories =
    activeFilter === 'all'
      ? memories
      : memories.filter((m) => m.eventTag === activeFilter);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPreviewImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !message) return;

    const newMemory: MemoryPost = {
      id: `mem-${Date.now()}`,
      guestName,
      message,
      eventTag: selectedTag,
      imageUrl: previewImage,
      createdAt: 'Just now',
      likes: 1,
    };

    onAddMemory(newMemory);
    setIsUploadOpen(false);
    setGuestName('');
    setMessage('');
  };

  return (
    <section id="memories" className="py-28 px-6 relative max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Living Heritage
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          GUEST MEMORY ARCHIVE
        </h2>
        <p className="font-serif italic text-base text-[var(--text-secondary)] max-w-xl mx-auto">
          Candid snapshots, joyous laughter, and intimate messages shared by our beloved guests.
        </p>
        <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />

        {/* Action Buttons: Upload & QR Code */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold-border)] bg-[#1c1a17] hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[#FAF8F5] transition-all duration-300 shadow-xl cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Contribute A Memory</span>
          </button>

          <button
            onClick={() => setIsQrOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold-border)]/60 hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[var(--text-secondary)] hover:text-[#FAF8F5] transition-all duration-300 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Table Card QR Code</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 pt-8">
          {[
            { id: 'all', label: 'ALL' },
            { id: 'mehndi', label: 'MEHNDI' },
            { id: 'baraat', label: 'BARAAT' },
            { id: 'walima', label: 'WALIMA' },
            { id: 'family', label: 'FAMILY' },
            { id: 'friends', label: 'FRIENDS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 text-[10px] font-sans tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#24201b] border-[var(--accent)] text-[#FAF8F5]'
                  : 'border-[var(--gold-border)]/40 text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Wall Grid (Private Archive Layout, Not Generic Social Feed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[var(--gold-border)] bg-[#151311] overflow-hidden flex flex-col justify-between shadow-xl group hover:border-[var(--accent)] transition-all duration-500"
          >
            {item.imageUrl && (
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--gold-border)]/50">
                <img
                  src={item.imageUrl}
                  alt={item.guestName}
                  className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#141210]/80 backdrop-blur-md px-2.5 py-1 text-[9px] tracking-luxury uppercase text-[var(--accent-light)] border border-[var(--gold-border)]">
                  {item.eventTag}
                </span>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="font-serif italic text-base text-[var(--text-primary)] font-light leading-relaxed">
                "{item.message}"
              </p>

              <div className="pt-4 border-t border-[var(--gold-border)]/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-cinzel text-sm text-[var(--accent-light)] block">
                    {item.guestName}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-sans tracking-wider">
                    {item.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[var(--accent)]">
                  <Heart className="w-3.5 h-3.5 fill-[var(--accent)]/30" />
                  <span className="text-xs font-cinzel">{item.likes}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Memory Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#161412] border border-[var(--gold-border)] p-8 shadow-2xl my-8"
            >
              <button
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-cinzel text-2xl text-[var(--text-primary)] uppercase tracking-wider text-center mb-6">
                CONTRIBUTE TO THE ARCHIVE
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Ayesha Siddiqui"
                    className="w-full bg-[#1e1a16] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Event Celebration
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value as any)}
                    className="w-full bg-[#1e1a16] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="all">General Memory</option>
                    <option value="mehndi">Mehndi Night</option>
                    <option value="baraat">Baraat Ceremony</option>
                    <option value="walima">Walima Reception</option>
                    <option value="family">Family Moments</option>
                    <option value="friends">Friends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Your Words or Story
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a funny moment, heartfelt prayer, or reflection..."
                    className="w-full bg-[#1e1a16] border border-[var(--gold-border)] px-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Upload A Photograph
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full text-xs text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-[#2a251e] file:text-[var(--accent-light)] file:cursor-pointer"
                  />
                </div>

                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-36 object-cover border border-[var(--gold-border)]/60"
                    />
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="px-5 py-2.5 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#25201a] border border-[var(--accent)] text-[11px] font-sans tracking-[0.2em] uppercase text-[#FAF8F5] inline-flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Publish Memory</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reception Table QR Code Modal */}
      <AnimatePresence>
        {isQrOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm paper-texture text-[#1f1d19] p-8 shadow-2xl embossed-border text-center space-y-6"
            >
              <button
                onClick={() => setIsQrOpen(false)}
                className="absolute top-4 right-4 text-[#635c51] hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="font-cinzel text-xs tracking-widest text-[#937138] uppercase block">
                  Reception Table Card
                </span>
                <h4 className="font-cinzel text-xl text-[#1e1c19] tracking-wider uppercase">
                  SHARE YOUR PERSPECTIVE
                </h4>
                <p className="font-serif italic text-xs text-[#5c5447]">
                  Scan with your smartphone camera to upload wedding memories directly to the couple's permanent heirloom archive.
                </p>
              </div>

              {/* High-Contrast Luxury QR Visual */}
              <div className="p-4 bg-white border border-[#c5ab73] inline-block shadow-inner">
                {/* SVG QR Code Graphic */}
                <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none">
                  {/* Outer Frame */}
                  <rect width="100" height="100" fill="white" />
                  {/* Corner Targets */}
                  <rect x="10" y="10" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                  <rect x="17" y="17" width="11" height="11" fill="#1f1d19" />
                  <rect x="65" y="10" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                  <rect x="72" y="17" width="11" height="11" fill="#1f1d19" />
                  <rect x="10" y="65" width="25" height="25" stroke="#1f1d19" strokeWidth="4" />
                  <rect x="17" y="72" width="11" height="11" fill="#1f1d19" />
                  {/* Pattern Dots */}
                  <rect x="42" y="14" width="6" height="6" fill="#937138" />
                  <rect x="52" y="14" width="6" height="6" fill="#1f1d19" />
                  <rect x="42" y="24" width="6" height="6" fill="#1f1d19" />
                  <rect x="42" y="42" width="16" height="16" fill="#937138" />
                  <rect x="65" y="42" width="6" height="6" fill="#1f1d19" />
                  <rect x="75" y="52" width="10" height="6" fill="#1f1d19" />
                  <rect x="14" y="45" width="8" height="8" fill="#1f1d19" />
                  <rect x="25" y="50" width="6" height="6" fill="#937138" />
                  <rect x="42" y="68" width="8" height="8" fill="#1f1d19" />
                  <rect x="65" y="72" width="15" height="15" fill="#937138" />
                  <rect x="85" y="72" width="6" height="6" fill="#1f1d19" />
                </svg>
              </div>

              <div className="text-[10px] font-sans tracking-luxury uppercase text-[#736a5c]">
                MUNIZA & MUZAMIL • 17.12.2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
