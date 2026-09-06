import { CoupleUniverseData, PartnerRole, WhyIChoseYouReason, SecretLetter, OpenWhenEnvelope, SecretSurpriseItem } from '../types/universe';
import { INITIAL_UNIVERSE_DATA } from '../data/universeSeedData';

const UNIVERSE_STORAGE_KEY = 'the_wedding_film_universe_data';

export function getUniverseData(): CoupleUniverseData {
  try {
    const saved = localStorage.getItem(UNIVERSE_STORAGE_KEY);
    if (saved) {
      const normalized = saved.replaceAll('"/images/', '"./images/');
      const parsed = JSON.parse(normalized);
      if (parsed.weddingDate !== '2026-12-25') {
        parsed.weddingDate = '2026-12-25';
        parsed.twoHearts = INITIAL_UNIVERSE_DATA.twoHearts;
        parsed.ourFirsts = INITIAL_UNIVERSE_DATA.ourFirsts;
        parsed.whenWeAreOld = INITIAL_UNIVERSE_DATA.whenWeAreOld;
        parsed.openWhenEnvelopes = INITIAL_UNIVERSE_DATA.openWhenEnvelopes;
        parsed.weddingDay24Hours = INITIAL_UNIVERSE_DATA.weddingDay24Hours;
        parsed.onePhotoTwoMemories = INITIAL_UNIVERSE_DATA.onePhotoTwoMemories;
        parsed.memorySurprises = INITIAL_UNIVERSE_DATA.memorySurprises;
        parsed.secretSurprises = INITIAL_UNIVERSE_DATA.secretSurprises;
        parsed.personalization = INITIAL_UNIVERSE_DATA.personalization;
        saveUniverseData(parsed);
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Failed to read universe data from localStorage:', e);
  }
  return INITIAL_UNIVERSE_DATA;
}

export function saveUniverseData(data: CoupleUniverseData): void {
  try {
    localStorage.setItem(UNIVERSE_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save universe data to localStorage:', e);
  }
}

export function addWhyIChoseYouReason(role: PartnerRole, text: string): CoupleUniverseData {
  const data = getUniverseData();
  const newReason: WhyIChoseYouReason = {
    id: `custom-r-${Date.now()}`,
    text,
    authorRole: role,
    createdAt: 'Just now',
  };

  if (role === 'bride') {
    data.whyIChoseYou.herReasons = [...data.whyIChoseYou.herReasons, newReason];
  } else {
    data.whyIChoseYou.hisReasons = [...data.whyIChoseYou.hisReasons, newReason];
  }

  saveUniverseData(data);
  return data;
}

export function unsealLetter(letterId: string): CoupleUniverseData {
  const data = getUniverseData();
  data.secretLetters = data.secretLetters.map((l) =>
    l.id === letterId ? { ...l, isSealed: false } : l
  );
  saveUniverseData(data);
  return data;
}

export function unsealOpenWhenEnvelope(envId: string): CoupleUniverseData {
  const data = getUniverseData();
  data.openWhenEnvelopes = data.openWhenEnvelopes.map((env) =>
    env.id === envId ? { ...env, isLocked: false } : env
  );
  saveUniverseData(data);
  return data;
}

export function addOpenWhenEnvelope(envelope: OpenWhenEnvelope): CoupleUniverseData {
  const data = getUniverseData();
  data.openWhenEnvelopes = [envelope, ...data.openWhenEnvelopes];
  saveUniverseData(data);
  return data;
}

export function isDateUnlocked(unlockDateStr?: string): boolean {
  if (!unlockDateStr) return true;
  const target = new Date(unlockDateStr + 'T00:00:00');
  const now = new Date();
  return now.getTime() >= target.getTime();
}
