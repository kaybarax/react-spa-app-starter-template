/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { TITLE } from '../../app-config';
import SecuredAppHeaderMenuNavigation from '../../routing-and-navigation/secured-app-header-menu-navigation';

export function SecuredPage2Example() {
  return (
    <React.Fragment>
      <title>{TITLE + ' | Secured App Page 2'}</title>

      <SecuredAppHeaderMenuNavigation />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Secured Page 2 Example</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>You have accessed another such page, only because you are logged in!</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SecuredPage2Example;
