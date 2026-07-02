/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';

export type RouteStatusType = 'loading' | 'error';

export interface RouteStatusProps {
  /** The kind of status to display — influences icon and aria attributes */
  status: RouteStatusType;
  /** Heading / title shown above the message */
  title?: string;
  /** Descriptive body text */
  message?: string;
  /** Optional className to layer on the wrapper */
  className?: string;
  /** Additional children rendered below the message */
  children?: React.ReactNode;
}

const DEFAULT_TITLES: Record<RouteStatusType, string> = {
  loading: 'Loading…',
  error: 'Something went wrong',
};

const DEFAULT_MESSAGES: Record<RouteStatusType, string> = {
  loading: 'Please wait while the page loads.',
  error: 'An unexpected error occurred. Please try again.',
};

/**
 * A reusable, accessible component for displaying route-level loading and
 * error states. Uses `role="status"` and `aria-live` so screen readers
 * announce changes automatically.
 */
const RouteStatus: React.FC<RouteStatusProps> = ({
  status,
  title,
  message,
  className = '',
  children,
}) => {
  const heading = title ?? DEFAULT_TITLES[status];
  const body = message ?? DEFAULT_MESSAGES[status];

  const isError = status === 'error';

  return (
    <div
      className={`route-status route-status--${status} ${className}`.trim()}
      role="status"
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <div className="flex-row-container center-align-content">
        <div className="flex-container-child-item center-align-content">
          {/* Icon */}
          <span
            className={`icon is-large ${isError ? 'has-text-danger' : 'has-text-info'}`}
            aria-hidden="true"
          >
            {isError ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            )}
          </span>

          {/* Title */}
          <h2 className="title is-4" style={{ marginTop: '1rem' }}>
            {heading}
          </h2>

          {/* Message */}
          <p className="subtitle is-6">{body}</p>

          {/* Optional children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default RouteStatus;
