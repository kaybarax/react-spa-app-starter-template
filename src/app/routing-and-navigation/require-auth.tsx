/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { LOGIN_AND_REGISTRATION_VIEW_ROUTE } from './views-routes-declarations';
import LoadingRouteFallback from '../loading-route-fallback';

export interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Route guard for secured views. Wrap any route element that requires the
 * user to be logged in; unauthenticated visitors are redirected to the
 * login page, with the location they attempted preserved in router state.
 *
 * While the persisted auth state is rehydrating on initial load, the
 * existing loading fallback is rendered so the user never sees a flash
 * of the login page before the guard can make its determination.
 */
export default function RequireAuth({ children }: RequireAuthProps) {
  // Track whether the persisted auth store has finished hydrating.  Zustand's
  // localStorage persistence is synchronous, but this pattern is ready for
  // async session validation (token endpoint, etc.).
  const [hydrated, setHydrated] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    // Yield to the microtask queue so the persist middleware has a chance to
    // rehydrate before we read the store.
    const id = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!hydrated) {
    return <LoadingRouteFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path} state={{ from: location }} replace />;
  }

  return children;
}
