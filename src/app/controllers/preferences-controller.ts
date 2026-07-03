/**
 * Preferences controller — applies persisted user preferences
 * (theme mode, interface density, reduced motion) to the DOM
 * by toggling CSS classes on <html>.
 *
 * Follows the same pattern as notifications-controller.ts.
 */
import { useEffect } from 'react';
import { useUserPreferencesStore, UserPreferencesState } from '../stores/stores';

const THEME_CLASS = 'pref-theme';
const DENSITY_CLASS = 'pref-density';
const MOTION_CLASS = 'pref-reduced-motion';

export type ThemeMode = 'light' | 'dark';
export type Density = 'comfortable' | 'compact';

/**
 * Applies the given preferences to the document root element.
 * Called both on initialisation and whenever preferences change.
 */
export function applyPreferences(prefs: UserPreferencesState): void {
  const root = document.documentElement;

  // Theme: data attribute and CSS class for cascade
  root.setAttribute('data-theme', prefs.themeMode);
  root.classList.remove(`${THEME_CLASS}-light`, `${THEME_CLASS}-dark`);
  root.classList.add(`${THEME_CLASS}-${prefs.themeMode}`);

  // Density
  root.classList.remove(`${DENSITY_CLASS}-comfortable`, `${DENSITY_CLASS}-compact`);
  root.classList.add(`${DENSITY_CLASS}-${prefs.density}`);

  // Reduced motion
  root.classList.remove(MOTION_CLASS);
  if (prefs.reducedMotion) {
    root.classList.add(MOTION_CLASS);
  }
}

/**
 * Hook that subscribes to preference changes and applies them to the DOM.
 * Call once from the app root or entry component.
 */
export function useApplyPreferences(): void {
  useEffect(() => {
    // Apply on mount
    const prefs = useUserPreferencesStore.getState();
    applyPreferences(prefs);

    // Subscribe to changes
    const unsub = useUserPreferencesStore.subscribe((state) => {
      applyPreferences(state);
    });

    return () => {
      unsub();
    };
  }, []);
}
