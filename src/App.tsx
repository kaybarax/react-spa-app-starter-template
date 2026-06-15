/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import './app/theme/app-styles.scss';
import AppEntry from './app/app-entry';
import { appIndexedDb } from './app/app-management/data-manager/indexeddb-manager';

export default function App() {
  React.useEffect(() => {
    //init app indexed db
    appIndexedDb();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          bottom: 4,
          right: 8,
          fontSize: 11,
          color: '#888',
          fontFamily: 'monospace',
          opacity: 0.7,
          zIndex: 9999,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        Starter ready
      </div>
      <AppEntry />
    </div>
  );
}
