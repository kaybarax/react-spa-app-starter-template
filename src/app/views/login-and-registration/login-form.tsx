/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from 'react';
import { isEmptyString } from '../../util/util';
import { handleLogin } from '../../controllers/login-controller';

export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitPressed, setSubmitPressed] = React.useState(false);

  const usernameOrEmailMissing = submitPressed && isEmptyString(usernameOrEmail);
  const passwordMissing = submitPressed && isEmptyString(password);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPressed(true);
    if (isEmptyString(usernameOrEmail) || isEmptyString(password)) {
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
            className={`input ${usernameOrEmailMissing ? 'is-danger' : ''}`}
            type="text"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
          />
        </div>
        {usernameOrEmailMissing && <p className="help is-danger">* This field is required.</p>}
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
