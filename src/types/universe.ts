export type PartnerRole = 'bride' | 'groom';

export interface PerspectiveStory {
  authorName: string;
  authorRole: PartnerRole;
  avatar?: string;
  feeling: string;
  remember: string;
  thinking: string;
  smile: string;
  nervous: string;
  neverForget: string;
}

export interface TwoHeartsStoriesData {
  her: PerspectiveStory;
  his: PerspectiveStory;
  unitedVow: {
    title: string;
    text: string;
    date: string;
  };
}

export interface WhyIChoseYouReason {
  id: string;
  text: string;
  authorRole: PartnerRole;
  createdAt: string;
}

export interface WhyIChoseYouData {
  herReasons: WhyIChoseYouReason[];
  hisReasons: WhyIChoseYouReason[];
  finalVow: string;
}

export interface SecretLetter {
  id: string;
  title: string;
  senderRole: PartnerRole;
  recipientRole: PartnerRole;
  content: string;
  unlockCondition: 'immediately' | 'wedding_day' | 'first_anniversary' | 'custom';
  unlockDate: string; // YYYY-MM-DD
  paperTone?: 'ivory' | 'parchment' | 'rose';
  isSealed: boolean;
  createdAt: string;
}

export interface OpenWhenEnvelope {
  id: string;
  title: string;
  subtitle: string;
  category: 'miss_me' | 'need_smile' | 'hard_day' | 'remember_us' | 'anniversary' | 'big_fight' | 'when_old' | 'custom';
  recipientRole: 'bride' | 'groom' | 'both';
  message: string;
  imageUrl?: string;
  voiceNoteDuration?: number;
  unlockDate?: string;
  isLocked: boolean;
  waxSealColor: string;
}

export interface FuturePromise {
  id: string;
  question: string;
  herAnswer: string;
  hisAnswer: string;
  unlockMilestone: '1_year' | '5_years' | '10_years' | 'custom';
  unlockDate: string; // YYYY-MM-DD
}

export interface FutureUsData {
  title: string;
  subtitle: string;
  promises: FuturePromise[];
}

export interface WhenWeAreOldData {
  unlockYear: number; // e.g. 2046
  title: string;
  subtitle: string;
  message: string;
  photos: string[];
  vowToOldAge: string;
}

export interface OurFirstMilestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  story: string;
  photoUrl?: string;
  voiceDurationSec?: number;
}

export interface OnePhotoTwoMemoriesItem {
  id: string;
  title: string;
  photoUrl: string;
  date: string;
  location: string;
  herMemory: string;
  hisMemory: string;
  sharedMoment: string;
}

export interface WeddingDayTimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  authorRole?: 'bride' | 'groom' | 'family';
  icon?: string;
  photoUrl?: string;
}

export interface FamilyBlessingItem {
  id: string;
  authorName: string;
  relationship: string;
  side: 'her_family' | 'his_family' | 'friends' | 'special';
  message: string;
  mediaType: 'text' | 'voice' | 'video';
  voiceWaveform?: number[];
  voiceDuration?: number;
}

export interface MemorySurpriseItem {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  memory: string;
  herComment?: string;
  hisComment?: string;
}

export interface SecretSurpriseItem {
  id: string;
  title: string;
  createdByRole: PartnerRole;
  targetRole: PartnerRole;
  revealDate: string; // YYYY-MM-DD
  letter: string;
  photos: string[];
  isLocked: boolean;
}

export interface CouplePersonalizationAnswers {
  howWeMet: string;
  firstImpression: string;
  whoSaidILoveYouFirst: string;
  favoriteMemory: string;
  mostMeaningfulPlace: string;
  ourSpecialSong: string;
  petNames: string;
  funniestMemory: string;
  mostExcitedAbout: string;
  sacredPromise: string;
}

export interface CoupleUniverseData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  twoHearts: TwoHeartsStoriesData;
  whyIChoseYou: WhyIChoseYouData;
  secretLetters: SecretLetter[];
  openWhenEnvelopes: OpenWhenEnvelope[];
  futureUs: FutureUsData;
  whenWeAreOld: WhenWeAreOldData;
  ourFirsts: OurFirstMilestone[];
  onePhotoTwoMemories: OnePhotoTwoMemoriesItem[];
  weddingDay24Hours: WeddingDayTimelineItem[];
  familyBlessings: FamilyBlessingItem[];
  memorySurprises: MemorySurpriseItem[];
  secretSurprises: SecretSurpriseItem[];
  personalization: CouplePersonalizationAnswers;
}
