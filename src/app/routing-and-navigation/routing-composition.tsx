/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  _404_VIEW,
  APP_DEV_MOCKS_VIEW_ROUTE,
  DEFAULT_VIEW_ROUTE,
  LOGIN_AND_REGISTRATION_VIEW_ROUTE,
  PAGE2EXAMPLE_VIEW_ROUTE,
  PAGE3EXAMPLE_VIEW_ROUTE,
  PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE,
  PAGE4EXAMPLE_VIEW_ROUTE,
  PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE,
  SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE,
  SECURED_PAGE2EXAMPLE_VIEW_ROUTE,
} from './views-routes-declarations';
import { useAppNavigation } from './use-app-navigation';
import RequireAuth from './require-auth';

export function AppBaseRoutingComposition(): JSX.Element {
  // Initialize appNavigation with router props
  useAppNavigation();

  return (
    <Routes>
      <Route path={DEFAULT_VIEW_ROUTE.path} element={<DEFAULT_VIEW_ROUTE.component />} />
      <Route path={PAGE2EXAMPLE_VIEW_ROUTE.path} element={<PAGE2EXAMPLE_VIEW_ROUTE.component />} />
      <Route path={PAGE3EXAMPLE_VIEW_ROUTE.path} element={<PAGE3EXAMPLE_VIEW_ROUTE.component />} />
      <Route path={PAGE4EXAMPLE_VIEW_ROUTE.path} element={<PAGE4EXAMPLE_VIEW_ROUTE.component />} />
      <Route path={PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.path} element={<PAGE4_SUB_ITEM_EXAMPLE_VIEW_ROUTE.component />} />
      <Route
        path={PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE.path}
        element={<PAGE5_SERVER_DATA_EXAMPLE_VIEW_ROUTE.component />}
      />
      <Route path={LOGIN_AND_REGISTRATION_VIEW_ROUTE.path} element={<LOGIN_AND_REGISTRATION_VIEW_ROUTE.component />} />
      <Route
        path={SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.path}
        element={
          <RequireAuth>
            <SECURED_HOMEPAGE_EXAMPLE_VIEW_ROUTE.component />
          </RequireAuth>
        }
      />
      <Route
        path={SECURED_PAGE2EXAMPLE_VIEW_ROUTE.path}
        element={
          <RequireAuth>
            <SECURED_PAGE2EXAMPLE_VIEW_ROUTE.component />
          </RequireAuth>
        }
      />
      <Route path={APP_DEV_MOCKS_VIEW_ROUTE.path} element={<APP_DEV_MOCKS_VIEW_ROUTE.component />} />
      <Route path="*" element={<_404_VIEW.component />} />
    </Routes>
  );
}
