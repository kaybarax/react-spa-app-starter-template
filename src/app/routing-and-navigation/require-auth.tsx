/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { LOGIN_AND_REGISTRATION_VIEW_ROUTE } from './views-routes-declarations';

export interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Route guard for secured views. Wrap any route element that requires the
 * user to be logged in; unauthenticated visitors are redirected to the
 * login page, with the location they attempted preserved in router state.
 */
export default function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path} state={{ from: location }} replace />;
  }

  return children;
}
