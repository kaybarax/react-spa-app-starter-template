/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { HeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';
import { TITLE } from '../app-config';
import { PAGE3EXAMPLE_VIEW_ROUTE } from '../routing-and-navigation/views-routes-declarations';
import { appNavigation, AppRoutes } from '../routing-and-navigation/app-navigation';

export default function Page2Example() {
  const _continueToPage3 = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    appNavigation.navigateTo(AppRoutes.PAGE3);
  };

  return (
    <React.Fragment>
      <title>{TITLE + ' | Page 2 — The Design Philosophy'}</title>
      <HeaderMenuNavigation />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Page 2 Example : The design philosophy!</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>
            <strong>App working data and main components state/data (the stores):</strong>
            <br />
            All app working data, and main components state is managed in your "stores."
            <br />
            So, you have a main store <em>"app"</em> which, specifically, is for managing <em>running app</em> data.
            <br />
            Then you have other stores based on, and for your app's main components, in this showcase,&nbsp; that would
            be the components [page1, page2, page3, page4]. Those stores essential hold the component's&nbsp; state
            globally, such that their information can be shared across each other.
            <br />
            The stores mini-ecosystem within the the design is setup in its directory across multiple files&nbsp; that
            are very much self explanatory to their roles. As you use this design system, just go with&nbsp; the flow
            there to extend (especially for "app" store) and add your own new stores for&nbsp; your app's components;
            and if you feel you can and want to improve on their design, of course, sure you can.
            <br />
            The stores are persisted to localStorage so that you don't lose your working data across page reloads.
            <br />
            <br />
            <strong>Controllers functions:</strong>
            <br />
            The first Javascript framework I worked with was AngularJs. That very first iteration of Angular.
            <br />
            And that's where I really got introduced to the MVC design pattern, hands on, after a partial introduction
            in&nbsp; Java's Swing. React is a view library and not a full blown framework like Angular. But I am sure
            like most&nbsp; engineers, we like the practice of splitting things apart and dealing with them in pieces.
            So, let's&nbsp; have React components' classes or functions only deal with mostly the UI rendering, while
            any and most&nbsp; of functions that, that component/activity relies on be lifted out to a "controller" file
            for that&nbsp; activity, and you can just import and use as you wish.
            <br />
            Just like the stores, the "controllers" are wrapped in their own directory for clean architecture&nbsp;
            encapsulation of bits and pieces.
            <br />
            <br />
            <strong>Routing and navigation:</strong>
            <br />
            Again, React being a view library, well, no router and navigation pattern inherently included, and&nbsp; so
            it's up to the developer to pick and choose what they fancy. So I have picked a router that I&nbsp; found
            fitting from experience with it, for this template framework design around React. Details on&nbsp; this
            choice of router, and other parts of the system, in the next example page.
            <br />
            And so with the selected router, I built around it a navigation and routing logic that so far,&nbsp; so
            good, I can smile about, and I find serving the whole system design, pretty well.
            <br />
            Routing and navigation logic setup is wrapped up in its own "routing-and-navigation"&nbsp; directory. Follow
            the pattern therein, to add your own new routes and navigation functionality&nbsp; for your app.
            <br />
            <br />
            So the above are the major parts of the system that needed a special mention. The rest are rather&nbsp; self
            explanatory from glance, container directory naming, and directory included <em>"ABOUT.md"</em>
            <br />
            Next up, what's in the box! What are bits and pieces that glue together, and power up this SPA starter&nbsp;
            template framework design???
            <br />
            <br />
            <a href={PAGE3EXAMPLE_VIEW_ROUTE.path} onClick={e => _continueToPage3(e)}>
              Continue to Page 3 Example...
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
