/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import RequireAuth from './require-auth';
import { useAuthStore } from '../stores/auth-store';

/**
 * A dummy protected page used inside RequireAuth in tests.
 */
function ProtectedDummy() {
  return <div data-testid="protected-content">Secret Dashboard</div>;
}

/**
 * A dummy public page used as the login route target.
 */
function LoginDummy() {
  return <div data-testid="login-page">Login Page</div>;
}

/**
 * Helper that reads the current location state and renders it as text
 * so tests can assert on the `from` redirect value.
 */
function LocationStateReader() {
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from;
  return <div data-testid="location-state-from">{from?.pathname ?? ''}</div>;
}

describe('RequireAuth', () => {
  const LOGIN_PATH = '/login-and-registration';

  beforeEach(() => {
    // Reset auth state before each test
    useAuthStore.setState({ isAuthenticated: false });
  });

  it('renders children when the user is authenticated', async () => {
    useAuthStore.setState({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <ProtectedDummy />
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for the hydration setTimeout(0) to resolve
    expect(await screen.findByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('redirects to the login page when not authenticated', async () => {
    useAuthStore.setState({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <ProtectedDummy />
              </RequireAuth>
            }
          />
          <Route path={LOGIN_PATH} element={<LoginDummy />} />
        </Routes>
      </MemoryRouter>,
    );

    // The fallback is rendered first (async hydration), then redirect happens.
    // We wait for the login page to appear after the setTimeout(0) resolves.
    expect(await screen.findByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('preserves the attempted secure route in router state ("from") when redirecting to login', async () => {
    useAuthStore.setState({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={['/secured-page-2']}>
        <Routes>
          <Route
            path="/secured-page-2"
            element={
              <RequireAuth>
                <ProtectedDummy />
              </RequireAuth>
            }
          />
          <Route
            path={LOGIN_PATH}
            element={
              <>
                <LoginDummy />
                <LocationStateReader />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for hydration to complete and the redirect to the login page
    expect(await screen.findByTestId('login-page')).toBeInTheDocument();

    // The router state must contain `from` with the path the user attempted
    const fromEl = screen.getByTestId('location-state-from');
    expect(fromEl.textContent).toBe('/secured-page-2');
  });
});
