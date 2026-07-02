import { render, screen } from '@testing-library/react';
import FallBackPage from './fall-back-page';

describe('FallBackPage', () => {
  it('renders the error fallback with the RouteStatus component', () => {
    render(<FallBackPage />);

    const region = screen.getByRole('status');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-live', 'assertive');

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
  });
});
