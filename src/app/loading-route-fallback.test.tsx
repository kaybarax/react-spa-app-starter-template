import { render, screen } from '@testing-library/react';
import LoadingRouteFallback from './loading-route-fallback';

describe('LoadingRouteFallback', () => {
  it('renders the loading fallback with the RouteStatus component', () => {
    render(<LoadingRouteFallback />);

    const region = screen.getByRole('status');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-live', 'polite');

    expect(screen.getByText('App is loading')).toBeInTheDocument();
    expect(screen.getByText('Please wait while the application loads.')).toBeInTheDocument();
  });
});
