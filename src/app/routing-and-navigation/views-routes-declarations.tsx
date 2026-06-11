/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { NotFoundPath } from '../views/not-found';
import { AppDevScratchPadPath } from '../../app-dev-scratch-pad/app-dev-scratch-pad';

export const DEFAULT_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-1-example')),
  path: '/',
};

export const PAGE2EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-2-example')),
  path: '/page-2-example',
};

export const PAGE3EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-3-example')),
  path: '/page-3-example',
};

export const PAGE4EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-4-example')),
  path: '/page-4-example',
};

export const PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-4-sub-item-example')),
  path: `${PAGE4EXAMPLE_VIEW_ROUTE.path}/:item`,
};

export const PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/page-5-server-data-example')),
  path: '/page-5-server-data-example',
};

export const LOGIN_AND_REGISTRATION_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/login-and-registration/login')),
  path: '/login-and-registration',
};

export const SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/secured-app/secured-homepage-example')),
  path: '/secured-app-home',
};

export const SECURED_PAGE2EXAMPLE_VIEW_ROUTE = {
  component: React.lazy(() => import('../views/secured-app/secured-page-2-example')),
  path: '/secured-page-2-example',
};

export const _404_VIEW = {
  component: React.lazy(() => import('../views/not-found')),
  path: NotFoundPath,
};

export const APP_DEV_MOCKS_VIEW_ROUTE = {
  component: React.lazy(() => import('../../app-dev-scratch-pad/app-dev-scratch-pad')),
  path: AppDevScratchPadPath,
};
