class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private chordTimer: number | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play a gentle, cinematic ambient chord progression
   * Warm ivory piano & cello-like harmonics
   */
  public startAmbient() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;

    this.isPlaying = true;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 3);

    // Warm, emotional chord frequencies (Hz) - D minor / F / A minor / G sus
    const progressions = [
      [146.83, 220.00, 261.63, 349.23, 523.25], // Dm9 / F6
      [130.81, 196.00, 261.63, 329.63, 392.00], // C major add9
      [110.00, 164.81, 220.00, 261.63, 440.00], // Am7
      [174.61, 220.00, 261.63, 349.23, 440.00], // Fmaj7
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const notes = progressions[chordIndex % progressions.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      notes.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm, acoustic filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + i * 200, now);

        // Sine/Triangle warm mix
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle envelope with long decay
        const noteDuration = 7.5;
        const noteVolume = 0.05 / (i + 1);
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(noteVolume, now + 1.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + noteDuration);
      });

      this.chordTimer = window.setTimeout(playChord, 6800);
    };

    playChord();
  }

  public stopAmbient() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    this.isPlaying = false;
    if (this.chordTimer) {
      clearTimeout(this.chordTimer);
      this.chordTimer = null;
    }
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
  }

  public toggleAmbient(): boolean {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  /**
   * Play a delicate, harmonic crystal chime for tactile unsealing & interactions
   */
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (crystal arpeggio)
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.07, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 1.9);
    });
  }

  /**
   * Play sample voice note audio using Web Audio synthesis with subtle vocal resonance
   */
  public playVoiceNoteSample(durationSec: number, onEnd: () => void): () => void {
    this.initContext();
    if (!this.ctx || !this.masterGain) {
      onEnd();
      return () => {};
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(2.5, now);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);

    // Human speaking voice frequency modulation
    for (let t = 0; t < durationSec; t += 0.4) {
      const pitch = 180 + Math.sin(t * 3) * 45 + Math.random() * 20;
      osc.frequency.setValueAtTime(pitch, now + t);
    }

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gain.gain.setValueAtTime(0.12, now + durationSec - 0.3);
    gain.gain.linearRampToValueAtTime(0, now + durationSec);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + durationSec);

    const timer = setTimeout(() => {
      onEnd();
    }, durationSec * 1000);

    return () => {
      clearTimeout(timer);
      try {
        osc.stop();
        gain.disconnect();
      } catch {
        // already stopped
      }
      onEnd();
    };
  }

  /**
   * Browser microphone recording for Voice Guestbook
   */
  public async startRecording(): Promise<boolean> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return false;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.start(100);
      return true;
    } catch (err) {
      console.warn('Microphone access denied or unavailable:', err);
      return false;
    }
  }

  public stopRecording(): Promise<{ duration: number; waveform: number[] }> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        // Fallback simulation
        const fakeWaveform = Array.from({ length: 32 }, () => Math.round(15 + Math.random() * 75));
        resolve({ duration: 8, waveform: fakeWaveform });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const fakeWaveform = Array.from({ length: 36 }, () => Math.round(20 + Math.random() * 80));
        resolve({ duration: 12, waveform: fakeWaveform });
        // stop tracks
        this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
      };

      this.mediaRecorder.stop();
    });
  }
}

export const audioEngine = new AudioEngine();
