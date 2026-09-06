import { ThemePalette } from '../types';

export const PRESET_THEMES: Record<string, ThemePalette> = {
  warmGold: {
    id: 'warmGold',
    name: 'Warm Ivory & Antique Gold',
    mood: 'dark',
    bgPrimary: '#0e0d0b',
    bgSecondary: '#171513',
    bgSurface: '#211e1a',
    textPrimary: '#f5f2eb',
    textSecondary: '#b8b1a5',
    accent: '#c9a96e',
    accentLight: '#e6d3a8',
    gold: '#d4af37',
    goldBorder: 'rgba(201, 169, 110, 0.28)',
    filmBorder: 'rgba(245, 242, 235, 0.08)',
  },
  roseVelvet: {
    id: 'roseVelvet',
    name: 'Dusty Rose & Muted Burgundy',
    mood: 'dark',
    bgPrimary: '#140d10',
    bgSecondary: '#1e1418',
    bgSurface: '#2b1c23',
    textPrimary: '#f8eff1',
    textSecondary: '#cbb3ba',
    accent: '#d99ca8',
    accentLight: '#f0ccd4',
    gold: '#cba374',
    goldBorder: 'rgba(217, 156, 168, 0.28)',
    filmBorder: 'rgba(248, 239, 241, 0.08)',
  },
  sageGarden: {
    id: 'sageGarden',
    name: 'Sage Olive & Warm Ivory',
    mood: 'dark',
    bgPrimary: '#0d1210',
    bgSecondary: '#141c18',
    bgSurface: '#1c2823',
    textPrimary: '#f0f4f1',
    textSecondary: '#acc0b4',
    accent: '#96b29f',
    accentLight: '#c2dac9',
    gold: '#c5ab73',
    goldBorder: 'rgba(150, 178, 159, 0.28)',
    filmBorder: 'rgba(240, 244, 241, 0.08)',
  },
  midnightGala: {
    id: 'midnightGala',
    name: 'Midnight Velvet & Champagne',
    mood: 'dark',
    bgPrimary: '#0a0d14',
    bgSecondary: '#101521',
    bgSurface: '#171e2e',
    textPrimary: '#eef2fb',
    textSecondary: '#aab4cc',
    accent: '#dfc28d',
    accentLight: '#faeecf',
    gold: '#d8b979',
    goldBorder: 'rgba(223, 194, 141, 0.28)',
    filmBorder: 'rgba(238, 242, 251, 0.08)',
  },
  editorialLight: {
    id: 'editorialLight',
    name: 'Editorial Parchment & Warm Gold',
    mood: 'light',
    bgPrimary: '#faf8f3',
    bgSecondary: '#f2eee5',
    bgSurface: '#ffffff',
    textPrimary: '#1f1c19',
    textSecondary: '#5a544b',
    accent: '#a68244',
    accentLight: '#cba766',
    gold: '#b89354',
    goldBorder: 'rgba(166, 130, 68, 0.28)',
    filmBorder: 'rgba(31, 28, 25, 0.08)',
  },
};

/**
 * Extracts dominant photographic tones from an image URL using canvas pixel sampling
 */
export async function extractPaletteFromImage(
  imageUrl: string,
  mood: 'dark' | 'light' = 'dark'
): Promise<ThemePalette> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(PRESET_THEMES.warmGold);
          return;
        }

        // Downsample for fast, smooth analysis
        const sampleSize = 64;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
        let rTotal = 0, gTotal = 0, bTotal = 0;
        let count = 0;

        // Sample pixels, weighting against extreme saturation
        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const sat = max === 0 ? 0 : (max - min) / max;

          // Reject extreme saturation (keep muted photographic colors)
          if (sat < 0.75) {
            rTotal += r;
            gTotal += g;
            bTotal += b;
            count++;
          }
        }

        const avgR = Math.round(rTotal / (count || 1));
        const avgG = Math.round(gTotal / (count || 1));
        const avgB = Math.round(bTotal / (count || 1));

        // Create elegant muted tones from sampled average
        const isDark = mood === 'dark';
        const bgFactor = isDark ? 0.08 : 0.96;
        const bgR = Math.round(avgR * bgFactor + (isDark ? 8 : 240 * 0.92));
        const bgG = Math.round(avgG * bgFactor + (isDark ? 7 : 236 * 0.92));
        const bgB = Math.round(avgB * bgFactor + (isDark ? 6 : 228 * 0.92));

        const accentR = Math.min(255, Math.round(avgR * 1.1 + 40));
        const accentG = Math.min(255, Math.round(avgG * 1.05 + 25));
        const accentB = Math.min(255, Math.round(avgB * 0.9 + 10));

        const palette: ThemePalette = {
          id: `extracted-${Date.now()}`,
          name: 'Extracted from Photograph',
          mood,
          bgPrimary: `rgb(${bgR}, ${bgG}, ${bgB})`,
          bgSecondary: `rgb(${Math.round(bgR * 1.25)}, ${Math.round(bgG * 1.25)}, ${Math.round(bgB * 1.25)})`,
          bgSurface: `rgb(${Math.round(bgR * 1.55)}, ${Math.round(bgG * 1.55)}, ${Math.round(bgB * 1.55)})`,
          textPrimary: isDark ? '#f6f3ed' : '#211d19',
          textSecondary: isDark ? '#b8b0a4' : '#5d564c',
          accent: `rgb(${accentR}, ${accentG}, ${accentB})`,
          accentLight: `rgb(${Math.min(255, accentR + 35)}, ${Math.min(255, accentG + 35)}, ${Math.min(255, accentB + 20)})`,
          gold: '#c9a96e',
          goldBorder: `rgba(${accentR}, ${accentG}, ${accentB}, 0.3)`,
          filmBorder: isDark ? 'rgba(245, 242, 235, 0.08)' : 'rgba(33, 29, 25, 0.08)',
        };

        resolve(palette);
      } catch (err) {
        console.warn('Canvas color extraction fallback:', err);
        resolve(PRESET_THEMES.warmGold);
      }
    };

    img.onerror = () => {
      resolve(PRESET_THEMES.warmGold);
    };
  });
}

/**
 * Apply the theme palette directly to CSS root custom properties
 */
export function applyThemeToDOM(palette: ThemePalette): void {
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', palette.bgPrimary);
  root.style.setProperty('--bg-secondary', palette.bgSecondary);
  root.style.setProperty('--bg-surface', palette.bgSurface);
  root.style.setProperty('--text-primary', palette.textPrimary);
  root.style.setProperty('--text-secondary', palette.textSecondary);
  root.style.setProperty('--accent', palette.accent);
  root.style.setProperty('--accent-light', palette.accentLight);
  root.style.setProperty('--gold-border', palette.goldBorder);
  root.style.setProperty('--film-border', palette.filmBorder);

  document.body.setAttribute('data-theme-mood', palette.mood);
}
