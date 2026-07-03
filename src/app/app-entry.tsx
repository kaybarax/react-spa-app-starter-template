/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppBaseRoutingComposition } from './routing-and-navigation/routing-composition';
import LoadingRouteFallback from './loading-route-fallback';
import SafeComponentWrapper from './safe-component-wrapper';
import AppNotificationAlert from './shared-components-and-modules/notification-center/app-notification-alert';
import UserPreferencesPanel from './shared-components-and-modules/user-preferences/user-preferences-panel';
import { useApplyPreferences } from './controllers/preferences-controller';

// TanStack Query client for server data fetching and caching. The app runs
// fully serverless; this is the blessed option for whenever a server comes
// into play. See views/page-5-server-data-example for usage.
const queryClient = new QueryClient();

export default function AppEntry() {
  // Apply persisted user preferences (theme, density, reduced motion)
  useApplyPreferences();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <React.Suspense fallback={<LoadingRouteFallback />}>
          <SafeComponentWrapper>
            <AppBaseRoutingComposition />
          </SafeComponentWrapper>
        </React.Suspense>
      </Router>
      <AppNotificationAlert />
      <UserPreferencesPanel />
    </QueryClientProvider>
  );
}
