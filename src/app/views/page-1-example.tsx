/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { HeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';
import { TITLE } from '../app-config';
import { PAGE2EXAMPLE_VIEW_ROUTE } from '../routing-and-navigation/views-routes-declarations';
import { appNavigation, AppRoutes } from '../routing-and-navigation/app-navigation';

export default function Page1Example() {
  const _continueToPage2 = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    appNavigation.navigateTo(AppRoutes.PAGE2);
  };

  return (
    <React.Fragment>
      <title>{TITLE + " | Page 1 — Let's Start Here!"}</title>
      <HeaderMenuNavigation />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Page 1 Example : Let's start here!</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>
            Hey there. So you have an SPA web app that you want to build with React Js.
            <br />
            And you need to come up with an app-wide, system design setup. That is, system breakdown to&nbsp; individual
            bits and pieces like, routing and navigation, controllers, app's global&nbsp; state management, and sharing
            components' state information;&nbsp; configuring security access for your pages, as to which are publicly
            accessible, and which&nbsp; a user must be logged in and authenticated to access; and even different&nbsp;
            types of access based on roles.
            <br />
            Well, this self-guiding design employed here in this,&nbsp; "
            <em>React Js SPA Web App with Login Starter Template Framework Design</em>"&nbsp; has got you covered.
            <br />
            <br />
            <a href={PAGE2EXAMPLE_VIEW_ROUTE.path} onClick={e => _continueToPage2(e)}>
              Continue to Page 2 Example to learn more...
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
