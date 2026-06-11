/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { handleResetPassword } from '../../controllers/login-controller';

export function ResetPasswordForm() {
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <form className="login-registration-form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <h3 className="title is-4">Reset Password</h3>

      <div className="field">
        <label className="label" htmlFor="reset-username-or-email">
          Enter your email address
        </label>
        <div className="control">
          <input
            id="reset-username-or-email"
            className="input"
            type="email"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
