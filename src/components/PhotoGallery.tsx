import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'editorial' | 'ceremonies' | 'details';
  caption: string;
}

const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: 'p-1',
    url: '/images/hero.jpg',
    title: 'The Golden Hour Promenade',
    category: 'editorial',
    caption: 'Bespoke ivory silk lehenga with antique gold zardozi and raw-silk sherwani.',
  },
  {
    id: 'p-2',
    url: '/images/mehndi.jpg',
    title: 'Mehndi Night of Jasmine & Amber',
    category: 'ceremonies',
    caption: 'Intricate traditional henna under hanging marigolds and brass lantern glow.',
  },
  {
    id: 'p-3',
    url: '/images/details.jpg',
    title: 'Heirloom Polki & Wax Seal',
    category: 'details',
    caption: 'Family heirloom jewelry, uncut diamonds, and wax-sealed formal invitations.',
  },
  {
    id: 'p-4',
    url: '/images/baraat.jpg',
    title: 'The Royal Palace Baraat Entrance',
    category: 'ceremonies',
    caption: 'Grand arrival at the heritage courtyard scattered with fresh rose petals.',
  },
  {
    id: 'p-5',
    url: '/images/walima.jpg',
    title: 'Walima Banquet Under Chandeliers',
    category: 'ceremonies',
    caption: 'Crystal chandeliers, white orchids, and black-tie elegance.',
  },
  {
    id: 'p-6',
    url: '/images/proposal.jpg',
    title: 'The Terrace Proposal',
    category: 'editorial',
    caption: 'The quiet sunset moment where two journeys became one.',
  },
];

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? DEFAULT_GALLERY
      : DEFAULT_GALLERY.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-28 px-6 relative max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Camera className="w-3.5 h-3.5" />
          The Curated Archive
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          PHOTOGRAPHY
        </h2>
        <p className="font-serif italic text-base text-[var(--text-secondary)]">
          Captured on 35mm film & medium format sensors
        </p>
        <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-6">
          {[
            { id: 'all', label: 'ALL ARCHIVES' },
            { id: 'editorial', label: 'PORTRAITS' },
            { id: 'ceremonies', label: 'CEREMONIES' },
            { id: 'details', label: 'DETAILS & HEIRLOOMS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2 text-[10px] font-sans tracking-[0.25em] uppercase transition-all duration-300 border cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#211e1a] border-[var(--accent)] text-[#FAF8F5] shadow-md'
                  : 'border-[var(--gold-border)]/50 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-border)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="break-inside-avoid relative overflow-hidden border border-[var(--gold-border)] bg-[#141210] group cursor-pointer shadow-xl"
            onClick={() => openLightbox(index)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              className="w-full object-cover filter contrast-[1.04] brightness-95 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent-light)] mb-1">
                {photo.category}
              </span>
              <h4 className="font-serif text-xl text-[#FAF8F5] font-light">{photo.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans mt-1 line-clamp-2">
                {photo.caption}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-luxury uppercase text-[var(--accent)]">
                <Maximize2 className="w-3 h-3" />
                <span>View Fullscreen</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Viewer */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-50 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-50 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo Container */}
            <div
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredPhotos[selectedPhotoIndex].url}
                alt={filteredPhotos[selectedPhotoIndex].title}
                className="max-w-full max-h-[72vh] object-contain border border-white/10 shadow-2xl"
              />

              {/* Caption */}
              <div className="text-center mt-6 space-y-1 max-w-xl">
                <h3 className="font-serif text-2xl text-[#FAF8F5] font-light">
                  {filteredPhotos[selectedPhotoIndex].title}
                </h3>
                <p className="text-xs font-sans tracking-wide text-white/60">
                  {filteredPhotos[selectedPhotoIndex].caption}
                </p>
                <span className="text-[10px] tracking-[0.25em] text-[var(--accent)] block uppercase pt-2">
                  {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
