/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { Link } from 'react-router-dom';
import '../theme/nav-styles.scss';
import {
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { appNavigation, AppRoutes } from './app-navigation';
import { FC, MouseEvent } from 'react';

interface MenuEntry {
  path: string;
  label: string;
  route: string;
}

const MENU_ENTRIES: MenuEntry[] = [
  { path: DEFAULT_VIEW_ROUTE.path, label: 'Page 1', route: AppRoutes.DEFAULT },
  { path: PAGE2EXAMPLE_VIEW_ROUTE.path, label: 'Page 2', route: AppRoutes.PAGE2 },
  { path: PAGE3EXAMPLE_VIEW_ROUTE.path, label: 'Page 3', route: AppRoutes.PAGE3 },
  { path: PAGE4EXAMPLE_VIEW_ROUTE.path, label: 'Page 4', route: AppRoutes.PAGE4 },
  { path: PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE.path, label: 'Page 5', route: AppRoutes.PAGE5 },
];

export const HeaderMenuNavigation: FC = () => {
  const slug = '/' + window.location.pathname.split('/').pop();

  const navigateOnClick = (event: MouseEvent<HTMLAnchorElement>, route: string) => {
    event.preventDefault();
    appNavigation.navigateTo(route);
  };

  return (
    <div>
      <ul>
        <li>
          <a href={DEFAULT_VIEW_ROUTE.path} onClick={event => navigateOnClick(event, AppRoutes.DEFAULT)}>
            Hi! <span>👋️</span> RJSSASTF <span className="badge">Starter template ready</span>
          </a>
        </li>
        {MENU_ENTRIES.map(entry => (
          <li key={entry.path} id={`nav-${entry.path}`} className={`${slug === entry.path ? 'selected' : ''}`}>
            <a href={entry.path} onClick={event => navigateOnClick(event, entry.route)}>
              {entry.label}
            </a>
          </li>
        ))}
        <li id={'navigateToAppDevScratchPad'}>
          <a href={APP_DEV_MOCKS_VIEW_ROUTE.path} onClick={event => navigateOnClick(event, AppRoutes.DEV_MOCKS)}>
            Mock some stuff{' '}
            <span role={'img'} aria-labelledby={'navigateToAppDevScratchPad'}>
              😏️😏️😌️
            </span>
          </a>
        </li>
        <li>
          <Link to={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path}>Log In</Link>
        </li>
      </ul>
    </div>
  );
};
