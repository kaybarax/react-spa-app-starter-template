/**
 * User Preferences Panel — a small floating panel that lets the user
 * change theme mode, interface density, and reduced-motion preference.
 *
 * Mounted once in AppEntry; reads/writes via the persisted
 * useUserPreferencesStore.
 */
import { useState } from 'react';
import { useUserPreferencesStore, UserPreferencesState } from '../../stores/stores';
import './user-preferences-panel.scss';

export default function UserPreferencesPanel() {
  const [open, setOpen] = useState(false);
  const themeMode = useUserPreferencesStore((s) => s.themeMode);
  const density = useUserPreferencesStore((s) => s.density);
  const reducedMotion = useUserPreferencesStore((s) => s.reducedMotion);

  const update = (patch: Partial<UserPreferencesState>) => {
    useUserPreferencesStore.setState(patch);
  };

  return (
    <div className={`user-preferences-panel ${open ? 'is-open' : ''}`}>
      <button
        className="user-preferences-panel__toggle button is-small is-info"
        onClick={() => setOpen((o) => !o)}
        aria-label="User preferences"
        title="User preferences"
      >
        {open ? '✕' : '⚙'}
      </button>

      {open && (
        <div className="user-preferences-panel__body box">
          <h6 className="title is-6">Preferences</h6>

          {/* Theme mode */}
          <label className="label is-small">Theme</label>
          <div className="buttons are-small">
            <button
              className={`button ${themeMode === 'light' ? 'is-link' : ''}`}
              onClick={() => update({ themeMode: 'light' })}
            >
              ☀ Light
            </button>
            <button
              className={`button ${themeMode === 'dark' ? 'is-link' : ''}`}
              onClick={() => update({ themeMode: 'dark' })}
            >
              ☾ Dark
            </button>
          </div>

          {/* Density */}
          <label className="label is-small">Density</label>
          <div className="buttons are-small">
            <button
              className={`button ${density === 'comfortable' ? 'is-link' : ''}`}
              onClick={() => update({ density: 'comfortable' })}
            >
              Comfortable
            </button>
            <button
              className={`button ${density === 'compact' ? 'is-link' : ''}`}
              onClick={() => update({ density: 'compact' })}
            >
              Compact
            </button>
          </div>

          {/* Reduced motion */}
          <label className="label is-small">
            <input
              type="checkbox"
              className="checkbox"
              checked={reducedMotion}
              onChange={(e) => update({ reducedMotion: e.target.checked })}
            />{' '}
            Reduce motion
          </label>
        </div>
      )}
    </div>
  );
}
