import { WeddingData } from '../types';
import { PRESET_THEMES } from '../services/colorExtractor';

export const INITIAL_WEDDINGS: Record<string, WeddingData> = {
  'muniza-muzamil': {
    id: 'w-muniza-muzamil',
    slug: 'muniza-muzamil',
    brideName: 'Muniza',
    groomName: 'Muzamil',
    initials: 'M & M',
    weddingDate: '2026-12-17',
    weddingDisplayDate: '17 December 2026',
    city: 'Lahore',
    country: 'Pakistan',
    prologueQuote1: 'Some stories are written.',
    prologueQuote2: 'Some are lived.',
    heroTagline: 'THE WEDDING FILM',
    heroPhoto: '/images/hero.jpg',
    letterText: [
      'To everyone who has been part of our journey, we cannot imagine celebrating this sacred threshold without you.',
      'From quiet conversations under Lahore’s evening skies to dreaming of the home we will build together, every memory has led us to this day. We gather not just to witness a union, but to honor the bonds of family, friendship, and eternal gratitude.',
      'Please bring your prayers, your laughter, and your open hearts as we step into our forever.'
    ],
    letterClosing: 'With endless love and gratitude,',
    filmVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41221-large.mp4',
    events: [
      {
        id: 'mehndi',
        title: 'MEHNDI',
        subtitle: 'An Evening of Henna, Song & Festive Gold',
        date: 'Thursday, 17 December 2026',
        time: '7:00 PM Onwards',
        venueName: 'The Haveli Courtyard',
        address: 'Bagh-e-Jinnah Heritage Grounds, Mall Road, Lahore',
        dressCode: 'Traditional Vibrant Festive — Shades of Mustard, Emerald & Marigold',
        description: 'An intimate celebration under fairy-lit banyan trees with folk dholak songs, delicate henna, and fragrant night-blooming jasmine.',
        mapUrl: 'https://maps.google.com/?q=Lahore+Gymkhana+Club',
        image: '/images/mehndi.jpg',
        paletteColor: '#c29236',
      },
      {
        id: 'baraat',
        title: 'BARAAT',
        subtitle: 'The Royal Entrance & Sacred Vows',
        date: 'Friday, 18 December 2026',
        time: '6:30 PM Reception',
        venueName: 'The Royal Palm Grand Ballroom',
        address: '52 Canal Bank Road, Lahore',
        dressCode: 'Formal Royal Elegance — Ivory, Champagne & Regal Crimson',
        description: 'A regal evening honoring time-honored heritage, the ceremonial arrival of the groom, and the exchange of lifelong vows.',
        mapUrl: 'https://maps.google.com/?q=Royal+Palm+Golf+and+Country+Club+Lahore',
        image: '/images/baraat.jpg',
        paletteColor: '#96343c',
      },
      {
        id: 'walima',
        title: 'WALIMA',
        subtitle: 'A Modern Editorial Dinner Under Chandeliers',
        date: 'Sunday, 20 December 2026',
        time: '7:30 PM Dinner',
        venueName: 'The Nishat Grand Banquets',
        address: 'Emporium Complex, Abdul Haque Rd, Johar Town, Lahore',
        dressCode: 'Black Tie / Modern Luxury Couture — Pastels & Midnight Hues',
        description: 'A celebration hosted by the groom’s family. Candlelit banquet tables, culinary excellence, and a night of heartfelt toasts.',
        mapUrl: 'https://maps.google.com/?q=The+Nishat+Hotel+Johar+Town+Lahore',
        image: '/images/walima.jpg',
        paletteColor: '#536b60',
      },
    ],
    timeline: [
      {
        year: '2019',
        title: 'The First Hello',
        caption: 'A rainy afternoon at a quiet architectural library. A shared book on Mughal geometry, a spilled cup of cardamom tea, and a conversation that never stopped.',
        location: 'Old Anarkali, Lahore',
        image: '/images/details.jpg',
      },
      {
        year: '2021',
        title: 'Somewhere Along The Way',
        caption: 'Between cross-country flights, shared playlists, and quiet Sunday strolls, forever quietly stopped being a distant idea and started feeling real.',
        location: 'Lake Como, Italy',
        image: '/images/proposal.jpg',
      },
      {
        year: '2025',
        title: 'One Question. One Answer.',
        caption: 'Under the warm amber glow of a terrace at dusk, with the minarets in the distance, Muzamil asked the question that changed both our worlds.',
        location: 'Walled City Terrace',
        image: '/images/hero.jpg',
      },
      {
        year: '2026',
        title: 'The Beginning of Forever',
        caption: 'Surrounded by our families, we begin the greatest adventure of our lives.',
        location: 'Lahore, Pakistan',
        image: '/images/walima.jpg',
      },
    ],
    guests: [
      {
        id: 'g-1',
        slug: 'ahmed-family',
        name: 'Ahmed & Family',
        partyLabel: 'Ahmed & Family',
        invitedEvents: ['mehndi', 'baraat', 'walima'],
        status: 'attending',
        adultsCount: 3,
        childrenCount: 1,
        dietaryNotes: 'No peanuts, Halal',
        personalMessage: 'Dearest Muzamil and Muniza, our hearts are overflowing with prayers for you two!',
        songRequest: 'Afreen Afreen - Coke Studio',
        updatedAt: '2026-08-15',
      },
      {
        id: 'g-2',
        slug: 'zain-malik',
        name: 'Zain Malik & Guest',
        partyLabel: 'Zain Malik',
        invitedEvents: ['baraat', 'walima'],
        status: 'attending',
        adultsCount: 2,
        childrenCount: 0,
        dietaryNotes: 'None',
        personalMessage: 'Cannot wait to dance on the Baraat my brother!',
        songRequest: 'Lover - Diljit Dosanjh',
        updatedAt: '2026-08-20',
      },
      {
        id: 'g-3',
        slug: 'fatima-khalid',
        name: 'Fatima Khalid',
        partyLabel: 'Fatima Khalid',
        invitedEvents: ['walima'],
        status: 'pending',
        adultsCount: 1,
        childrenCount: 0,
      },
      {
        id: 'g-4',
        slug: 'tariq-uncle',
        name: 'Dr. Tariq & Begum Tariq',
        partyLabel: 'Dr. Tariq Family',
        invitedEvents: ['mehndi', 'baraat', 'walima'],
        status: 'attending',
        adultsCount: 2,
        childrenCount: 0,
        dietaryNotes: 'Diabetic friendly desserts please',
        personalMessage: 'Blessings to both families on this historic union.',
      },
    ],
    memories: [
      {
        id: 'm-1',
        guestName: 'Zain Malik',
        eventTag: 'mehndi',
        message: 'The energy at the dholak practice tonight was unmatched! Muzamil has been practicing his dance moves for months!',
        imageUrl: '/images/mehndi.jpg',
        createdAt: '2 days ago',
        likes: 24,
      },
      {
        id: 'm-2',
        guestName: 'Ammi & Abba',
        eventTag: 'family',
        message: 'Watching you grow into the grace you carry today is our greatest answered prayer. May your life be illuminated with endless warmth.',
        imageUrl: '/images/details.jpg',
        createdAt: '3 days ago',
        likes: 58,
      },
      {
        id: 'm-3',
        guestName: 'Fatima',
        eventTag: 'friends',
        message: 'Remember when we sat in university daydreaming about our wedding day? Look at you now, looking like an ethereal royalty!',
        imageUrl: '/images/hero.jpg',
        createdAt: 'Yesterday',
        likes: 19,
      },
    ],
    voiceNotes: [
      {
        id: 'vn-1',
        speakerName: 'Ammi',
        relationship: "Bride's Mother",
        durationSeconds: 32,
        createdAt: 'September 2026',
        waveformData: [25, 40, 65, 80, 50, 45, 70, 95, 85, 60, 40, 55, 75, 90, 65, 50, 40, 60, 80, 70, 45, 30, 20],
        audioSampleType: 'warm',
      },
      {
        id: 'vn-2',
        speakerName: 'Best Friend Bilal',
        relationship: "Groom's Brother-in-Arms",
        durationSeconds: 47,
        createdAt: 'August 2026',
        waveformData: [30, 55, 85, 100, 90, 75, 60, 80, 95, 70, 50, 65, 85, 90, 60, 75, 85, 90, 60, 45, 35, 25],
        audioSampleType: 'piano',
      },
      {
        id: 'vn-3',
        speakerName: 'Uncle Tariq',
        relationship: 'Family Elder',
        durationSeconds: 28,
        createdAt: 'July 2026',
        waveformData: [20, 35, 50, 65, 80, 60, 45, 55, 70, 75, 60, 45, 55, 65, 70, 55, 40, 30, 25],
        audioSampleType: 'gentle',
      },
    ],
    theme: PRESET_THEMES.warmGold,
    dna: {
      howWeMet: 'Through a shared fascination with classical architecture at an old library.',
      whereWeMet: 'Lahore, Pakistan',
      proposalStory: 'A quiet sunset on a historic brick terrace overlooking the Badshahi Mosque arches with a violin playing softly.',
      favoriteSong: 'Afreen Afreen & La Vie En Rose',
      weddingStyle: 'Haute Editorial',
      culturalTraditions: ['Traditional Dholak Songs', 'Nikah Ceremony', 'Rukhsati with Quran', 'Kashmiri Chai Banquet'],
      signatureQuote: 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    },
  },

  'ayesha-usman': {
    id: 'w-ayesha-usman',
    slug: 'ayesha-usman',
    brideName: 'Ayesha',
    groomName: 'Usman',
    initials: 'A & U',
    weddingDate: '2027-03-22',
    weddingDisplayDate: '22 March 2027',
    city: 'Islamabad',
    country: 'Pakistan',
    prologueQuote1: 'Two lives. Two paths.',
    prologueQuote2: 'One horizon.',
    heroTagline: 'THE WEDDING FILM',
    heroPhoto: '/images/proposal.jpg',
    letterText: [
      'Welcome to the beginning of our new chapter.',
      'Surrounded by the Margalla hills and the people who nurtured our growth, we invite you to stand beside us as we seal our promise.',
    ],
    letterClosing: 'Forever thankful,',
    filmVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41221-large.mp4',
    events: [
      {
        id: 'mehndi',
        title: 'QAWWALI & MEHNDI',
        subtitle: 'Sufi Melodies & Spring Florals',
        date: 'Friday, 20 March 2027',
        time: '6:00 PM',
        venueName: 'Serena Sheesh Mahal Gardens',
        address: 'Khayaban-e-Suhrawardy, Islamabad',
        dressCode: 'Muted Sage, Peach & Ivory',
        description: 'A soulful evening of live Sufi Qawwali, candlelit reflection pools, and blooming jasmine.',
        mapUrl: 'https://maps.google.com/?q=Islamabad+Serena+Hotel',
        image: '/images/mehndi.jpg',
        paletteColor: '#96b29f',
      },
      {
        id: 'baraat',
        title: 'BARAAT & NIKAH',
        subtitle: 'The Sacred Vows',
        date: 'Saturday, 21 March 2027',
        time: '5:00 PM',
        venueName: 'Faisal Mosque Courtyard View',
        address: 'Shah Faisal Avenue, Islamabad',
        dressCode: 'Classical Gold & Deep Maroon',
        description: 'A reverent and graceful dusk Nikah ceremony as the call to prayer echoes across the hills.',
        mapUrl: 'https://maps.google.com/?q=Faisal+Mosque+Islamabad',
        image: '/images/baraat.jpg',
        paletteColor: '#7e2d36',
      },
      {
        id: 'walima',
        title: 'WALIMA GALA',
        subtitle: 'Celebration of Togetherness',
        date: 'Sunday, 22 March 2027',
        time: '7:00 PM',
        venueName: 'Marriott Grand Crystal Ballroom',
        address: 'Aga Khan Road, Islamabad',
        dressCode: 'Formal Black Tie & Champagne',
        description: 'An elegant sit-down banquet with speeches, acoustic violinists, and midnight cake cutting.',
        mapUrl: 'https://maps.google.com/?q=Islamabad+Marriott+Hotel',
        image: '/images/walima.jpg',
        paletteColor: '#3c4d44',
      },
    ],
    timeline: [
      {
        year: '2020',
        title: 'The Coffee Shop Encounter',
        caption: 'Overhearing a debate on film scores at a quiet cafe in F-7.',
        location: 'Islamabad',
        image: '/images/details.jpg',
      },
      {
        year: '2023',
        title: 'Mountain Hikes & Endless Hopes',
        caption: 'Trail 3 mornings, shared thermoses of tea, and realizing life without the other felt incomplete.',
        location: 'Margalla Hills',
        image: '/images/proposal.jpg',
      },
      {
        year: '2027',
        title: 'The Sacred Step',
        caption: 'Stepping into our forever with all of you.',
        location: 'Islamabad',
        image: '/images/hero.jpg',
      },
    ],
    guests: [
      {
        id: 'g-201',
        slug: 'usman-colleagues',
        name: 'The Tech Team',
        partyLabel: 'Tech Team',
        invitedEvents: ['walima'],
        status: 'attending',
        adultsCount: 4,
        childrenCount: 0,
      },
    ],
    memories: [],
    voiceNotes: [],
    theme: PRESET_THEMES.sageGarden,
    dna: {
      howWeMet: 'At a cafe during a rainfall afternoon in Islamabad.',
      whereWeMet: 'Islamabad, Pakistan',
      proposalStory: 'At the top of Monal overlook during a misty winter sunset.',
      favoriteSong: 'Tu Jhoom',
      weddingStyle: 'Romantic Garden',
      culturalTraditions: ['Live Qawwali', 'Nikah under White Silk Canopy'],
      signatureQuote: 'Whatever our souls are made of, his and mine are the same.',
    },
  },
};

const STORAGE_KEY = 'wedding_film_platform_state_v1';

export function getStoredWedding(slug: string): WeddingData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[slug]) {
        return parsed[slug];
      }
    }
  } catch (e) {
    console.warn('LocalStorage error reading wedding:', e);
  }
  return INITIAL_WEDDINGS[slug] || INITIAL_WEDDINGS['muniza-muzamil'];
}

export function saveStoredWedding(wedding: WeddingData): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const state = saved ? JSON.parse(saved) : { ...INITIAL_WEDDINGS };
    state[wedding.slug] = wedding;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('LocalStorage error saving wedding:', e);
  }
}

export function getAllWeddingSlugs(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      return Object.keys(state);
    }
  } catch {
    // fallback
  }
  return Object.keys(INITIAL_WEDDINGS);
}

export const MUNIZA_MUZAMIL_WEDDING: WeddingData = INITIAL_WEDDINGS['muniza-muzamil'];
export const AREEBA_HAMZA_WEDDING: WeddingData = MUNIZA_MUZAMIL_WEDDING;
export const SEED_WEDDINGS: Record<string, WeddingData> = {
  ...INITIAL_WEDDINGS,
  'areeba-hamza': MUNIZA_MUZAMIL_WEDDING,
};
