/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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
