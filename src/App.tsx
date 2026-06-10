/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import './app/theme/app-styles.scss';
import AppEntry from './app/app-entry';
import { isEmptyObject, isNullUndefined } from './app/util/util';
import { appIndexedDb } from './app/app-management/data-manager/indexeddb-manager';
import { useAppStores, useAppStore } from './app/stores';
import { appNavigation, NavigationStore } from './app/routing-and-navigation/app-navigation';

export default function App() {
  const { stores, appStoresLoaded, loadAppStores } = useAppStores();
  const appStore = useAppStore();
  const [loadingFeedback, setLoadingFeedback] = React.useState('Initializing app state...');

  React.useEffect(() => {
    //init app indexed db
    appIndexedDb();

    //init app stores
    if (!appStoresLoaded || isEmptyObject(stores)) {
      setLoadingFeedback('Initializing app state...');
      loadAppStores().then(() => {
        if (!isEmptyObject(stores)) {
          setLoadingFeedback('App state loaded!');
        } else {
          setLoadingFeedback('Failed to load app state. Reload app to try again');
        }
      });
    }
  }, [appStoresLoaded, stores, loadAppStores]);

  if (!appStoresLoaded || isEmptyObject(stores)) {
    return (
      <>
        <small style={{
          position: 'fixed',
          bottom: 8,
          right: 8,
          background: '#f0f0f0',
          padding: '2px 6px',
          borderRadius: 4,
          fontSize: 11,
          zIndex: 9999,
        }}>
          Starter ready
        </small>
        <div>
          <h3>{loadingFeedback}</h3>
        </div>
      </>
    );
  }

  // pass navStore reference to appNavigation
  if (isNullUndefined(appNavigation.getNavStore())) {
    appNavigation.setNavStore(appStore.navStore as NavigationStore);
  }

  return (
    <>
      <small style={{
        position: 'fixed',
        bottom: 8,
        right: 8,
        background: '#f0f0f0',
        padding: '2px 6px',
        borderRadius: 4,
        fontSize: 11,
        zIndex: 9999,
      }}>
        Starter ready
      </small>
      <AppEntry />
    </>
  );
}
