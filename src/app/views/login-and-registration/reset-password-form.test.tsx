import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from './reset-password-form';

const mockHandleResetPassword = vi.hoisted(() => vi.fn());

vi.mock('../../controllers/login-controller', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../controllers/login-controller')>();
  return {
    ...mod,
    handleResetPassword: mockHandleResetPassword,
  };
});

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email field and submit button', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('shows required error and does not submit when email is empty', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('* This field is required.')).toBeInTheDocument();
    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });

  it('shows invalid email error for malformed email', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.type(screen.getByLabelText('Enter your email address'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('* Please enter a valid email address.')).toBeInTheDocument();
    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });

  it('submits with a valid email', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.type(
      screen.getByLabelText('Enter your email address'),
      'user@example.com',
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.queryByText('* This field is required.'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('* Please enter a valid email address.'),
    ).not.toBeInTheDocument();
    expect(mockHandleResetPassword).toHaveBeenCalledTimes(1);
  });

  it('applies is-danger class when email is invalid', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.type(screen.getByLabelText('Enter your email address'), 'bad');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    const input = screen.getByLabelText('Enter your email address');
    expect(input.className).toContain('is-danger');
  });

  it('rejects email without domain part', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.type(screen.getByLabelText('Enter your email address'), 'user@');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('* Please enter a valid email address.')).toBeInTheDocument();
    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });
});
