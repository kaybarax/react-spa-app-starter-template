import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { ResetPasswordForm } from './reset-password-form';
import { handleLogin, handleResetPassword } from '../../controllers/login-controller';

vi.mock('../../controllers/login-controller', () => ({
  handleLogin: vi.fn(),
  handleResetPassword: vi.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the username/email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Username/Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows validation messages and does not submit when fields are empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getAllByText('* This field is required.')).toHaveLength(2);
    expect(handleLogin).not.toHaveBeenCalled();
  });

  it('submits the entered credentials', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.queryByText('* This field is required.')).not.toBeInTheDocument();
    expect(handleLogin).toHaveBeenCalledWith({ usernameOrEmail: 'kevin@example.com', password: 'secret' });
  });
});

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the email input and Submit button', () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('calls handleResetPassword on submit with typed email', async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm />);

    await user.type(screen.getByLabelText('Enter your email address'), 'kevin@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleResetPassword).toHaveBeenCalledTimes(1);
  });
});
