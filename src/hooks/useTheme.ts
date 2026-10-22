import { useState, useEffect, useCallback } from 'react';
import { ThemeId, ThemeConfig } from '../types/gallery';
import { themes } from '../data/themes';

const STORAGE_KEY = 'cinematic_wallpaper_slider_theme';

export function useTheme() {
  const [activeTheme, setActiveThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId;
      if (saved && (saved === 'summer' || saved === 'sunset' || saved === 'night')) {
        return saved;
      }
    } catch {
      // localStorage may fail in restricted iframes
    }
    return 'summer';
  });

  const currentThemeConfig: ThemeConfig = themes[activeTheme] || themes.summer;

  const setActiveTheme = useCallback((themeId: ThemeId) => {
    setActiveThemeState(themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const config = currentThemeConfig;

    root.style.setProperty('--accent-primary', config.accentPrimary);
    root.style.setProperty('--accent-secondary', config.accentSecondary);
    root.style.setProperty('--accent-glow', config.accentGlow);
    root.style.setProperty('--highlight', config.highlight);
    root.style.setProperty('--text-primary', config.textPrimary);
    root.style.setProperty('--text-muted', config.textMuted);
    root.style.setProperty('--surface-glass', config.surfaceGlass);
    root.style.setProperty('--border-subtle', config.borderSubtle);
    root.style.setProperty('--shadow-color', config.shadowColor);
    root.style.setProperty('--overlay-color', config.overlayColor);
    root.style.setProperty('--hover-glow', config.accentGlow);
    root.style.setProperty('--transition-duration', '400ms');

    root.setAttribute('data-theme', activeTheme);
  }, [activeTheme, currentThemeConfig]);

  return {
    activeTheme,
    setActiveTheme,
    themeConfig: currentThemeConfig,
  };
}
