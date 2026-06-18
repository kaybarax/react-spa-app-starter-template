/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import '../theme/nav-styles.scss';
import {
  DEFAULT_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { appNavigation, AppRoutes } from './app-navigation';
import authStore from '../stores/auth-store';
import { useAppStore } from '../stores';

export default function SecuredAppHeaderMenuNavigation() {
  const user = useAppStore(state => state.user);

  const slug = '/' + window.location.pathname.split('/').pop();

  return (
    <div>
      <ul>
        <li>
          <a
            href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.SECURED_HOME);
            }}
          >
            Hi! <span>👋️</span> Welcome {user?.name}
          </a>
        </li>
        <li
          id={`nav-${SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.SECURED_HOME);
            }}
          >
            Secured App Home
          </a>
        </li>
        <li
          id={`nav-${SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}`}
          className={`${slug === SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path ? 'selected' : ''}`}
        >
          <a
            href={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              appNavigation.navigateTo(AppRoutes.SECURED_PAGE2);
            }}
          >
            Secured App Page 2
          </a>
        </li>
        <li>
          <a
            href={DEFAULT_VIEW_ROUTE.path}
            onClick={event => {
              event.preventDefault();
              authStore.handleLogout();
            }}
          >
            Log out
          </a>
        </li>
      </ul>
      <span
        id="starter-status-badge"
        style={{
          float: 'right',
          color: '#fff',
          backgroundColor: '#48c774',
          padding: '4px 10px',
          fontSize: '0.75rem',
          lineHeight: '2rem',
          borderRadius: '4px',
          margin: '8px 16px',
        }}
      >
        Starter template ready
      </span>
    </div>
  );
}
