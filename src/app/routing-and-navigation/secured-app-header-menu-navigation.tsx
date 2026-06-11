/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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
    </div>
  );
}
