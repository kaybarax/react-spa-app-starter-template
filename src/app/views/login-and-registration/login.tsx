/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { TITLE } from '../../app-config';
import { LOGIN_PAGE_ACTIONS } from '../../stores/actions-and-stores-data';
import '../../theme/login-styles.scss';
import { useLoginStore } from '../../stores';
import LoginForm from './login-form';
import SignUpForm from './sign-up-form';
import { ResetPasswordForm } from './reset-password-form';

export default function Login() {
  const pageAction = useLoginStore(state => state.pageAction);

  const showLoginForm = () => {
    useLoginStore.setState({ pageAction: LOGIN_PAGE_ACTIONS.LOGIN });
  };

  const showSignUpForm = () => {
    useLoginStore.setState({ pageAction: LOGIN_PAGE_ACTIONS.SIGN_UP });
  };

  const showResetPasswordForm = () => {
    useLoginStore.setState({ pageAction: LOGIN_PAGE_ACTIONS.RESET_PASSWORD });
  };

  const showLogin = !pageAction || pageAction === LOGIN_PAGE_ACTIONS.LOGIN;
  const showSignUp = pageAction === LOGIN_PAGE_ACTIONS.SIGN_UP;
  const showResetPassword = pageAction === LOGIN_PAGE_ACTIONS.RESET_PASSWORD;

  // The tab title follows the active form — React 19 keeps the hoisted
  // <title> in sync with renders
  const pageTitle = showSignUp ? 'Sign Up' : showResetPassword ? 'Reset Password' : 'Login';

  return (
    <React.Fragment>
      <title>{TITLE + ' | ' + pageTitle}</title>

      <div>
        <div className={'flex-row-container'}>
          <div className={'flex-container-child-item center-align-content'}>
            <h3 className={`login-action title is-4`}>
              <span className={`${showLogin ? 'selected' : ''}`} onClick={showLoginForm}>
                Login
              </span>{' '}
              |&nbsp;
              <span className={`${showSignUp ? 'selected' : ''}`} onClick={showSignUpForm}>
                Sign Up
              </span>{' '}
              |&nbsp;
              <span className={`${showResetPassword ? 'selected' : ''}`} onClick={showResetPasswordForm}>
                Reset Password
              </span>
            </h3>
            <a href={'/'}>Exit</a>
          </div>
        </div>

        {showLogin && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <LoginForm />
            </div>
          </div>
        )}

        {showSignUp && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <SignUpForm onSignUpSuccess={showLoginForm} />
            </div>
          </div>
        )}

        {showResetPassword && (
          <div className={'flex-row-container'}>
            <div className={'flex-container-child-item center-align-content'}>
              <ResetPasswordForm />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
