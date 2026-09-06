export type LifecycleMode = 'before' | 'day' | 'after' | 'anniversary';

export type EventId = 'mehndi' | 'baraat' | 'walima';

export interface WeddingEvent {
  id: EventId;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  dressCode: string;
  description: string;
  mapUrl: string;
  image: string;
  paletteColor: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  caption: string;
  location: string;
  image?: string;
}

export interface Guest {
  id: string;
  slug: string;
  name: string;
  partyLabel: string;
  invitedEvents: EventId[];
  status: 'pending' | 'attending' | 'declined';
  adultsCount: number;
  childrenCount: number;
  dietaryNotes?: string;
  personalMessage?: string;
  songRequest?: string;
  updatedAt?: string;
}

export interface MemoryPost {
  id: string;
  guestName: string;
  eventTag: 'all' | EventId | 'family' | 'friends';
  message: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
}

export interface VoiceNote {
  id: string;
  speakerName: string;
  relationship: string;
  durationSeconds: number;
  createdAt: string;
  waveformData: number[];
  audioSampleType: 'piano' | 'gentle' | 'warm';
}

export interface ThemePalette {
  id: string;
  name: string;
  mood: 'dark' | 'light';
  bgPrimary: string;
  bgSecondary: string;
  bgSurface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentLight: string;
  gold: string;
  goldBorder: string;
  filmBorder: string;
}

export interface WeddingDNA {
  howWeMet: string;
  whereWeMet: string;
  proposalStory: string;
  favoriteSong: string;
  weddingStyle: 'Haute Editorial' | 'Royal Heritage' | 'Contemporary Minimalist' | 'Romantic Garden';
  culturalTraditions: string[];
  signatureQuote: string;
}

export interface WeddingData {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  initials: string;
  weddingDate: string; // YYYY-MM-DD
  weddingDisplayDate: string;
  city: string;
  country: string;
  prologueQuote1: string;
  prologueQuote2: string;
  heroTagline: string;
  heroPhoto: string;
  letterText: string[];
  letterClosing: string;
  filmVideoUrl: string;
  events: WeddingEvent[];
  timeline: StoryMilestone[];
  guests: Guest[];
  memories: MemoryPost[];
  voiceNotes: VoiceNote[];
  theme: ThemePalette;
  dna: WeddingDNA;
}
