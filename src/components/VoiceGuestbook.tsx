import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceNote } from '../types';
import { Play, Pause, Mic, MicOff, Check, Heart, Plus, Sparkles } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface VoiceGuestbookProps {
  voiceNotes: VoiceNote[];
  onAddVoiceNote: (note: VoiceNote) => void;
}

export const VoiceGuestbook: React.FC<VoiceGuestbookProps> = ({
  voiceNotes,
  onAddVoiceNote,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [speakerName, setSpeakerName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Family Friend');
  const stopPlaybackRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<number | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (stopPlaybackRef.current) {
        stopPlaybackRef.current();
      }
    };
  }, []);

  const handlePlayToggle = (note: VoiceNote) => {
    if (playingId === note.id) {
      if (stopPlaybackRef.current) {
        stopPlaybackRef.current();
        stopPlaybackRef.current = null;
      }
      setPlayingId(null);
    } else {
      if (stopPlaybackRef.current) {
        stopPlaybackRef.current();
      }
      setPlayingId(note.id);
      stopPlaybackRef.current = audioEngine.playVoiceNoteSample(
        note.durationSeconds,
        () => {
          setPlayingId(null);
          stopPlaybackRef.current = null;
        }
      );
    }
  };

  const handleStartRecord = async () => {
    const success = await audioEngine.startRecording();
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = window.setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handleStopRecordAndSave = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    const result = await audioEngine.stopRecording();

    const newNote: VoiceNote = {
      id: `vn-${Date.now()}`,
      speakerName: speakerName || 'Dearest Well-Wisher',
      relationship: relationship || 'Guest',
      durationSeconds: Math.max(result.duration, recordingSeconds),
      createdAt: 'Just now',
      waveformData: result.waveform,
      audioSampleType: 'warm',
    };

    onAddVoiceNote(newNote);
    setIsRecordingModalOpen(false);
    setSpeakerName('');
    setRecordingSeconds(0);
  };

  return (
    <section id="voice-guestbook" className="py-28 px-6 relative max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Audio Keepsake
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          MESSAGES FROM THE PEOPLE WE LOVE
        </h2>
        <p className="font-serif italic text-base text-[var(--text-secondary)] max-w-xl mx-auto">
          Spoken blessings, laughter, and tearful joys recorded forever as an auditory family heirloom.
        </p>
        <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />

        {/* Record Your Voice Button */}
        <div className="pt-4">
          <button
            onClick={() => setIsRecordingModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold-border)] bg-[#1c1a17] hover:border-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase text-[#FAF8F5] transition-all duration-300 shadow-xl cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Record A Voice Message</span>
          </button>
        </div>
      </div>

      {/* Elegant Audio Memories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {voiceNotes.map((note) => {
          const isPlaying = playingId === note.id;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 border transition-all duration-500 bg-[#151311] ${
                isPlaying
                  ? 'border-[var(--accent)] shadow-2xl bg-[#1c1915]'
                  : 'border-[var(--gold-border)]/60 hover:border-[var(--gold-border)]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-cinzel text-lg tracking-wider text-[var(--text-primary)]">
                    {note.speakerName}
                  </h4>
                  <span className="text-[11px] font-sans tracking-wide text-[var(--accent-light)] block">
                    {note.relationship}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-cinzel text-xs text-[var(--text-muted)] tracking-wider">
                    0:{note.durationSeconds < 10 ? `0${note.durationSeconds}` : note.durationSeconds}
                  </span>
                  <span className="text-[9px] block text-[var(--text-muted)] tracking-widest uppercase">
                    {note.createdAt}
                  </span>
                </div>
              </div>

              {/* Subtle Audio Waveform Visualizer */}
              <div className="py-3 flex items-center justify-between gap-1 h-12 px-2 bg-[#0e0d0c] border border-white/5 rounded-none">
                {note.waveformData.map((height, i) => {
                  const animatedHeight = isPlaying
                    ? Math.max(15, (height + (i % 3) * 15) % 100)
                    : height;

                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-none transition-all duration-200 ${
                        isPlaying ? 'bg-[var(--accent)]' : 'bg-[#403b35]'
                      }`}
                      style={{
                        height: `${animatedHeight}%`,
                        opacity: isPlaying ? 0.9 : 0.4,
                      }}
                    />
                  );
                })}
              </div>

              {/* Play Control */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  onClick={() => handlePlayToggle(note)}
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                      <span>Pause Message</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                      <span>Listen to Blessing</span>
                    </>
                  )}
                </button>

                <Heart className="w-3.5 h-3.5 text-[var(--accent)]/40" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Record Voice Note Modal */}
      <AnimatePresence>
        {isRecordingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#161412] border border-[var(--gold-border)] p-8 shadow-2xl text-center space-y-6"
            >
              <h3 className="font-cinzel text-2xl text-[var(--text-primary)] uppercase tracking-wider">
                RECORD YOUR VOICE BLESSING
              </h3>
              <p className="font-serif italic text-sm text-[var(--text-secondary)]">
                Leave a heartfelt audio memory that the couple will listen to on their anniversaries for decades.
              </p>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="e.g. Khala Yasmin / Bilal"
                    className="w-full bg-[#1e1a16] border border-[var(--gold-border)]/60 px-4 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1">
                    Relationship to Couple
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="e.g. Groom's Cousin, Childhood Friend"
                    className="w-full bg-[#1e1a16] border border-[var(--gold-border)]/60 px-4 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              {/* Live Record Trigger and Timer */}
              <div className="py-4 flex flex-col items-center gap-3">
                <button
                  onClick={isRecording ? handleStopRecordAndSave : handleStartRecord}
                  className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                    isRecording
                      ? 'border-red-500 bg-red-950/40 text-red-400 animate-pulse'
                      : 'border-[var(--accent)] bg-[#211d18] text-[var(--accent)] hover:scale-105'
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>

                <span className="font-cinzel text-lg tracking-widest text-[var(--text-primary)]">
                  {isRecording ? `Recording... 0:${recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}` : 'Tap Mic to Start Recording'}
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setIsRecordingModalOpen(false);
                    setIsRecording(false);
                  }}
                  className="px-5 py-2.5 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-white"
                >
                  Cancel
                </button>

                {isRecording && (
                  <button
                    onClick={handleStopRecordAndSave}
                    className="px-6 py-2.5 bg-[#25201a] border border-[var(--accent)] text-[11px] font-sans tracking-[0.2em] uppercase text-[#FAF8F5] inline-flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Save Message</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
