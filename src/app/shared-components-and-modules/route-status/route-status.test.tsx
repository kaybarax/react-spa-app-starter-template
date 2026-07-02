import { render, screen } from '@testing-library/react';
import RouteStatus from './route-status';

describe('RouteStatus', () => {
  describe('loading state', () => {
    it('renders a loading status with default copy', () => {
      render(<RouteStatus status="loading" />);

      const region = screen.getByRole('status');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-live', 'polite');
      expect(region).toHaveAttribute('aria-atomic', 'true');

      expect(screen.getByText('Loading…')).toBeInTheDocument();
      expect(screen.getByText('Please wait while the page loads.')).toBeInTheDocument();
    });

    it('renders a loading status with custom title and message', () => {
      render(
        <RouteStatus
          status="loading"
          title="Fetching data…"
          message="Hold tight while we grab your information."
        />,
      );

      expect(screen.getByText('Fetching data…')).toBeInTheDocument();
      expect(screen.getByText('Hold tight while we grab your information.')).toBeInTheDocument();
    });

    it('renders children below the message', () => {
      render(
        <RouteStatus status="loading">
          <button>Retry</button>
        </RouteStatus>,
      );

      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });

    it('applies the status CSS class', () => {
      const { container } = render(<RouteStatus status="loading" />);
      expect(container.firstChild).toHaveClass('route-status--loading');
    });
  });

  describe('error state', () => {
    it('renders an error status with default copy', () => {
      render(<RouteStatus status="error" />);

      const region = screen.getByRole('status');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-live', 'assertive');

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
    });

    it('renders an error status with custom title and message', () => {
      render(
        <RouteStatus
          status="error"
          title="Network failure"
          message="Could not connect to the server. Check your connection."
        />,
      );

      expect(screen.getByText('Network failure')).toBeInTheDocument();
      expect(screen.getByText('Could not connect to the server. Check your connection.')).toBeInTheDocument();
    });

    it('applies the error CSS class', () => {
      const { container } = render(<RouteStatus status="error" />);
      expect(container.firstChild).toHaveClass('route-status--error');
    });
  });

  describe('accessibility', () => {
    it('marks icons as aria-hidden', () => {
      render(<RouteStatus status="loading" />);
      const icons = document.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThanOrEqual(1);
    });
  });
});
