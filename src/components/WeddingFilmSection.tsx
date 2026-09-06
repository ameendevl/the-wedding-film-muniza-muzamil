import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';

interface WeddingFilmSectionProps {
  filmUrl: string;
  brideName: string;
  groomName: string;
}

export const WeddingFilmSection: React.FC<WeddingFilmSectionProps> = ({
  filmUrl,
  brideName,
  groomName,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / rect.width;
      videoRef.current.currentTime = ratio * videoRef.current.duration;
      setProgress(ratio * 100);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="film" className="py-28 px-6 relative max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Film className="w-3.5 h-3.5" />
          The Cinematic Memory
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          THE WEDDING FILM
        </h2>
        <p className="font-serif italic text-base text-[var(--text-secondary)]">
          {brideName} & {groomName} • Directed & Edited in 4K Super 35
        </p>
        <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />
      </div>

      {/* Large Custom Video Player */}
      <div className="relative border border-[var(--gold-border)] bg-black shadow-2xl overflow-hidden group">
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-1 bg-[var(--accent)]/10 blur-2xl opacity-40 pointer-events-none" />

        <video
          ref={videoRef}
          src={filmUrl}
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full aspect-video object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Minimalist Overlay Play Button when Paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full border border-[var(--gold-border)] bg-[#171411]/80 backdrop-blur-md flex items-center justify-center text-[var(--accent)] shadow-2xl"
            >
              <Play className="w-8 h-8 ml-1 fill-[var(--accent)]" />
            </motion.div>
          </div>
        )}

        {/* Custom Minimalist Video Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3">
          {/* Progress Scrubber */}
          <div
            onClick={handleSeek}
            className="w-full h-1 bg-white/20 hover:h-2 transition-all duration-200 cursor-pointer rounded-none relative"
          >
            <div
              className="h-full bg-[var(--accent)] relative"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FAF8F5] rounded-full shadow" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-[#FAF8F5] text-xs font-sans tracking-wide">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="hover:text-[var(--accent)] transition-colors p-1"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                onClick={toggleMute}
                className="hover:text-[var(--accent)] transition-colors p-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] hidden sm:inline">
                Chapter 01: The Sacred Union
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent-light)] border border-[var(--gold-border)] px-2 py-0.5">
                4K Ultra HD
              </span>
              <button
                onClick={toggleFullscreen}
                className="hover:text-[var(--accent)] transition-colors p-1"
                aria-label="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
