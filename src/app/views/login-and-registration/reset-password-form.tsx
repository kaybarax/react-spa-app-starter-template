/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { handleResetPassword, isValidEmail } from '../../controllers/login-controller';
import { isEmptyString } from '../../util/util';

export function ResetPasswordForm() {
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [submitPressed, setSubmitPressed] = React.useState(false);

  const emailMissing = submitPressed && isEmptyString(usernameOrEmail);
  const invalidEmail = submitPressed && !isEmptyString(usernameOrEmail) && !isValidEmail(usernameOrEmail);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPressed(true);
    if (isEmptyString(usernameOrEmail) || !isValidEmail(usernameOrEmail)) {
      return;
    }
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
            className={`input ${emailMissing || invalidEmail ? 'is-danger' : ''}`}
            type="email"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
          />
        </div>
        {emailMissing && <p className="help is-danger">* This field is required.</p>}
        {invalidEmail && <p className="help is-danger">* Please enter a valid email address.</p>}
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
