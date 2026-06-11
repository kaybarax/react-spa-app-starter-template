/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { TITLE } from '../app-config';
import { isNullUndefined } from '../util/util';
import { SOs_and_Credits_List } from '../app-management/data-manager/list-manager';
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderMenuNavigation } from '../routing-and-navigation/header-menu-navigation';
import { appNavigation, AppRoutes } from '../routing-and-navigation/app-navigation';
import imagePlaceholder from '../media/images/image.png';

export default function Page4SubItemExample() {
  const { item } = useParams();

  const person = SOs_and_Credits_List.find(it => it.person === item);

  if (isNullUndefined(person)) {
    return (
      <React.Fragment>
        <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
        <div className="container is-fluid">
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <h5 className="title is-5">No user details</h5>
            </div>
          </div>

          <div>
            <a
              className="button is-info"
              onClick={e => {
                e.preventDefault();
                appNavigation.navigateTo(AppRoutes.PAGE4);
              }}
            >
              Go back
            </a>
          </div>
          <br />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <title>{TITLE + ' | Page 4 Sub-item Example '}</title>
      <HeaderMenuNavigation />

      <div className="container is-fluid">
        <div className={'flex-row-container'}>
          <div className={'flex-container-child-item center-align-content'}>
            <h5 className="title is-5">Page 4 Item Example : Accredited Details</h5>
          </div>
        </div>

        <div className="columns">
          <div className="column is-full is-primary">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={imagePlaceholder} alt="Placeholder image" />{' '}
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={imagePlaceholder} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{person?.person}</p>
                    <p className="subtitle is-6">
                      <a href={person?.links[0].link} target={'_blank'}>
                        @{person?.links[0].site}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="content">
                  {person?.attribution}&nbsp;
                  <br />
                  <a href={person?.links[1].link} target={'_blank'}>
                    {person?.links[1].site}
                  </a>
                  <hr />
                  Touch-ups here with{' '}
                  <a href={'https://bulma.io'} target={'_blank'}>
                    @bulmaio
                  </a>
                  &nbsp;
                  <a href="">#css</a> <a href="">#responsive</a>&nbsp;
                  <a className="button is-small">
                    <FontAwesomeIcon icon={faCoffee} />
                  </a>
                  <br />
                  <time dateTime={new Date().toLocaleDateString()}>{new Date().toLocaleDateString()}</time>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            className="button is-info"
            onClick={e => {
              e.preventDefault();
              appNavigation.navigateTo(AppRoutes.PAGE4);
            }}
          >
            Go back
          </a>
        </div>
        <br />
      </div>
    </React.Fragment>
  );
}
