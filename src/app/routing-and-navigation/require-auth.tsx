/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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
