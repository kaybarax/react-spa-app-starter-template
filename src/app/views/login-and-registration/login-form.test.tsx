import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { isValidEmail } from '../../controllers/login-controller';

const mockHandleLogin = vi.hoisted(() => vi.fn());

vi.mock('../../controllers/login-controller', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../controllers/login-controller')>();
  return {
    ...mod,
    handleLogin: mockHandleLogin,
  };
});

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
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('submits the entered credentials', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.queryByText('* This field is required.')).not.toBeInTheDocument();
    expect(mockHandleLogin).toHaveBeenCalledWith({
      usernameOrEmail: 'kevin@example.com',
      password: 'secret',
    });
  });

  it('shows invalid email error when the email format is wrong', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'bad@');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('* Please enter a valid email address.')).toBeInTheDocument();
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('shows invalid email error alongside password required error', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'bad@');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('* Please enter a valid email address.')).toBeInTheDocument();
    expect(screen.getAllByText('* This field is required.')).toHaveLength(1);
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('does not validate email format for values without @ (username-only)', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'myusername');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      screen.queryByText('* Please enter a valid email address.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('* This field is required.')).not.toBeInTheDocument();
    expect(mockHandleLogin).toHaveBeenCalledWith({
      usernameOrEmail: 'myusername',
      password: 'secret',
    });
  });

  it('validates a proper email when it contains @', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'valid@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(
      screen.queryByText('* Please enter a valid email address.'),
    ).not.toBeInTheDocument();
    expect(mockHandleLogin).toHaveBeenCalledWith({
      usernameOrEmail: 'valid@example.com',
      password: 'secret',
    });
  });

  it('requires password field on submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('* This field is required.')).toBeInTheDocument();
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('requires usernameOrEmail field on submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('* This field is required.')).toBeInTheDocument();
    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('clears validation on successful re-entry after invalid attempt', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getAllByText('* This field is required.')).toHaveLength(2);

    await user.type(screen.getByLabelText('Username/Email'), 'valid@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.queryByText('* This field is required.')).not.toBeInTheDocument();
    expect(mockHandleLogin).toHaveBeenCalledWith({
      usernameOrEmail: 'valid@example.com',
      password: 'secret',
    });
  });

  it('shows danger class on usernameOrEmail input when email invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'bad@');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    const input = screen.getByLabelText('Username/Email');
    expect(input.className).toContain('is-danger');
  });

  it('shows danger class on password input when password missing', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    const input = screen.getByLabelText('Password');
    expect(input.className).toContain('is-danger');
  });
});

describe('isValidEmail', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('a.b@domain.co')).toBe(true);
    expect(isValidEmail('test@sub.example.org')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('@missingusername.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('user@.com')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
  });
});
