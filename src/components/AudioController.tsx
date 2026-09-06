import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    // Check initial state
    setIsPlaying(audioEngine.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const active = audioEngine.toggleAmbient();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Expanded controls */}
      {isOpen && (
        <div className="mr-3 bg-[#181614]/90 backdrop-blur-md border border-[var(--gold-border)] py-2 px-4 flex items-center gap-3 text-xs tracking-wider text-[var(--text-secondary)] shadow-2xl transition-all duration-300">
          <div className="flex flex-col">
            <span className="font-serif italic text-sm text-[var(--text-primary)]">Cinematic Ambience</span>
            <span className="text-[10px] tracking-luxury uppercase text-[var(--accent)]">Piano & Strings</span>
          </div>

          <div className="h-4 w-[1px] bg-[var(--gold-border)]" />

          {/* Volume slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 accent-[var(--accent)] bg-[#2a2622] rounded cursor-pointer"
            aria-label="Volume"
          />
        </div>
      )}

      {/* Main minimal audio button */}
      <button
        onClick={() => {
          if (!isPlaying) {
            handleToggle();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        onDoubleClick={handleToggle}
        title={isPlaying ? "Audio playing (Click to adjust, double-click to mute)" : "Play ambient cinematic music"}
        className="group relative h-12 w-12 rounded-full border border-[var(--gold-border)] bg-[#141210]/95 backdrop-blur-md flex items-center justify-center transition-all duration-500 hover:border-[var(--accent)] hover:scale-105 shadow-xl cursor-pointer"
      >
        {/* Subtle breathing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-40 animate-ping pointer-events-none" />
        )}

        {isPlaying ? (
          <div className="flex items-center gap-0.5">
            <span className="w-0.5 h-3 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-5 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-4 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-0.5 h-2 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* Direct Mute / Play quick toggle when expanded */}
      {isOpen && (
        <button
          onClick={handleToggle}
          className="ml-2 h-12 w-12 rounded-full border border-[var(--gold-border)] bg-[#141210]/95 flex items-center justify-center text-[var(--accent)] hover:bg-[#201d19]"
          title={isPlaying ? "Mute music" : "Resume music"}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};
