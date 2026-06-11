/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import notFoundImage from '../media/images/_404_.png';
import { FC } from 'react';
import { TITLE } from '../app-config';

const NotFound: FC = () => {
  return (
    <div className="container is-fluid">
      <title>{TITLE + ' | Page Not Found'}</title>
      <div className={'flex-row-container'}>
        <div className={'flex-container-child-item center-align-content'}>
          <h1 className="title">Oops! Sorry, Page Not Found</h1>
        </div>
      </div>
      <div style={{ paddingTop: 40 }}>
        <a href={'/'}>
          <button className="button">Return {'>>'}</button>
        </a>
      </div>
      <div>
        <img src={notFoundImage} alt={'404'} />
      </div>
    </div>
  );
};

export const NotFoundPath = '/not-found';

export default NotFound;
