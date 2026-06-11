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

  return <AppEntry />;
}
