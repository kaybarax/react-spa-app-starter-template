/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { isEmptyString } from '../../util/util';
import { handleLogin, isValidEmail } from '../../controllers/login-controller';

export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitPressed, setSubmitPressed] = React.useState(false);

  const looksLikeEmail = usernameOrEmail.includes('@');
  const invalidEmail = submitPressed && looksLikeEmail && !isValidEmail(usernameOrEmail);
  const usernameOrEmailMissing = submitPressed && isEmptyString(usernameOrEmail);
  const passwordMissing = submitPressed && isEmptyString(password);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPressed(true);
    // Check conditions directly so validation fires on the same tick
    if (isEmptyString(usernameOrEmail) || isEmptyString(password)) {
      return;
    }
    if (usernameOrEmail.includes('@') && !isValidEmail(usernameOrEmail)) {
      return;
    }
    handleLogin({ usernameOrEmail, password });
  };

  return (
    <form className="login-registration-form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="username-or-email">
          Username/Email
        </label>
        <div className="control">
          <input
            id="username-or-email"
            className={`input ${usernameOrEmailMissing || invalidEmail ? 'is-danger' : ''}`}
            type="text"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
          />
        </div>
        {usernameOrEmailMissing && <p className="help is-danger">* This field is required.</p>}
        {invalidEmail && <p className="help is-danger">* Please enter a valid email address.</p>}
      </div>

      <div className="field">
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="control">
          <input
            id="password"
            className={`input ${passwordMissing ? 'is-danger' : ''}`}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {passwordMissing && <p className="help is-danger">* This field is required.</p>}
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
