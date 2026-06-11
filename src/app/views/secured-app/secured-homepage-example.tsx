/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { TITLE } from '../../app-config';
import SecuredAppHeaderMenuNavigation from '../../routing-and-navigation/secured-app-header-menu-navigation';
import { useSecuredAppStore } from '../../stores';

export function SecuredHomepageExample() {
  const clicksCount = useSecuredAppStore(state => state.clicksCount);

  const incrementClicksCount = () => {
    useSecuredAppStore.setState(state => ({ clicksCount: state.clicksCount + 1 }));
  };

  return (
    <React.Fragment>
      <title>{TITLE + ' | Secured App Home'}</title>

      <SecuredAppHeaderMenuNavigation />

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h5 className="title is-5">Secured Page Example</h5>
        </div>
      </div>

      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <p style={{ textAlign: 'left' }}>You have accessed a page such as this, only because you have logged in!</p>
          <div>
            <h3 className="title is-5">Try counting clicks</h3>
            <button className="button is-link" onClick={incrementClicksCount}>
              Click me
            </button>
            <h5 className="subtitle is-6" style={{ marginTop: '0.75rem' }}>
              You have clicked {clicksCount}
            </h5>
            <p>
              <i>The count is store-managed and persisted — reload the page and it sticks around.</i>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SecuredHomepageExample;
