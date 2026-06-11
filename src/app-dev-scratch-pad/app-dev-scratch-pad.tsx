/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { FC } from 'react';
import SafeComponentWrapper from '../app/safe-component-wrapper';

export const AppDevScratchPadPath = '/app-dev-scratch-pad';

const AppDevScratchPad: FC = () => {
  return (
    <SafeComponentWrapper>
      <title>{' Mock Stuff Page '}</title>

      <div className="container is-fluid">
        <div className={'flex-row-container'}>
          <div className={'flex-container-child-item center-align-content'}>
            <h4 className="title is-5">MOCK STUFF AWAY TO YOUR HEARTS DESIRE!!</h4>
          </div>
        </div>

        <div style={{ paddingTop: 40 }}>
          <button
            className="button"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Go Home
          </button>
          <br />
          <br />
          <div>
            <form>
              <label htmlFor={'mockFile'}>Mock file upload for example</label>
              <br />
              <input type={'file'} id={'mockFile'} name={'mockFile'} multiple={false} />
              <br />
              <br />
              <button
                className="button"
                type={'button'}
                onClick={() => {
                  // TODO: Call your 'mock file upload function'
                }}
              >
                Mock Upload
              </button>
            </form>
            <br />
          </div>
        </div>
        <div className="">&nbsp;</div>
      </div>
    </SafeComponentWrapper>
  );
};

export default AppDevScratchPad;
