/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { handleSignUp } from '../../controllers/login-controller';
import { isEmptyString } from '../../util/util';
import { User } from '../../app-management/data-manager/models-manager';

export interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
  const [name, setName] = React.useState('');
  const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [submitPressed, setSubmitPressed] = React.useState(false);

  const nameMissing = submitPressed && isEmptyString(name);
  const usernameOrEmailMissing = submitPressed && isEmptyString(usernameOrEmail);
  const passwordMissing = submitPressed && isEmptyString(password);
  const confirmPasswordMissing = submitPressed && isEmptyString(confirmPassword);
  const passwordsMismatch = submitPressed && !isEmptyString(confirmPassword) && password !== confirmPassword;

  const isValidFormData = () =>
    !isEmptyString(name) &&
    !isEmptyString(usernameOrEmail) &&
    !isEmptyString(password) &&
    !isEmptyString(confirmPassword) &&
    password === confirmPassword;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPressed(true);
    if (!isValidFormData()) {
      return;
    }
    const user = new User();
    user.name = name;
    user.usernameOrEmail = usernameOrEmail;
    user.password = password;
    handleSignUp(user, onSignUpSuccess);
  };

  return (
    <form className="login-registration-form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="name">
          Name
        </label>
        <div className="control">
          <input
            id="name"
            className={`input ${nameMissing ? 'is-danger' : ''}`}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        {nameMissing && <p className="help is-danger">* This field is required.</p>}
      </div>

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
        <label className="label" htmlFor="confirm-password">
          Confirm Password
        </label>
        <div className="control">
          <input
            id="confirm-password"
            className={`input ${confirmPasswordMissing || passwordsMismatch ? 'is-danger' : ''}`}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        {confirmPasswordMissing && <p className="help is-danger">* This field is required.</p>}
        {passwordsMismatch && <p className="help is-danger">Passwords do not match.</p>}
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Sign Up
          </button>
        </div>
      </div>

      <p>
        <i>Your sign up data is stored locally in your browser's embedded IndexedDb</i>
      </p>
    </form>
  );
}
