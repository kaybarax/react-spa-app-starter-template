import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './sign-up-form';

const mockHandleSignUp = vi.hoisted(() => vi.fn());
const onSignUpSuccess = vi.hoisted(() => vi.fn());

vi.mock('../../controllers/login-controller', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../controllers/login-controller')>();
  return {
    ...mod,
    handleSignUp: mockHandleSignUp,
  };
});

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name, username/email, password and confirm password fields', () => {
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username/Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('shows required errors for all empty fields on submit', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getAllByText('* This field is required.')).toHaveLength(4);
    expect(mockHandleSignUp).not.toHaveBeenCalled();
  });

  it('submits valid form data', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'Kevin Barasa');
    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.queryByText('* This field is required.')).not.toBeInTheDocument();
    expect(mockHandleSignUp).toHaveBeenCalledTimes(1);
    const userArg = mockHandleSignUp.mock.calls[0][0];
    expect(userArg.name).toBe('Kevin Barasa');
    expect(userArg.usernameOrEmail).toBe('kevin@example.com');
    expect(userArg.password).toBe('secret123');
  });

  it('shows mismatch error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'Kevin Barasa');
    await user.type(screen.getByLabelText('Username/Email'), 'kevin@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm Password'), 'different');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    expect(mockHandleSignUp).not.toHaveBeenCalled();
  });

  it('shows invalid email error when email format is wrong', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'Kevin Barasa');
    await user.type(screen.getByLabelText('Username/Email'), 'bad@');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('* Please enter a valid email address.')).toBeInTheDocument();
    expect(mockHandleSignUp).not.toHaveBeenCalled();
  });

  it('does not validate email format for username-only values (no @)', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.type(screen.getByLabelText('Name'), 'Kevin Barasa');
    await user.type(screen.getByLabelText('Username/Email'), 'myusername');
    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm Password'), 'secret123');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(
      screen.queryByText('* Please enter a valid email address.'),
    ).not.toBeInTheDocument();
    expect(mockHandleSignUp).toHaveBeenCalledTimes(1);
  });

  it('rejects submit with all validation errors at once', async () => {
    const user = userEvent.setup();
    render(<SignUpForm onSignUpSuccess={onSignUpSuccess} />);

    await user.type(screen.getByLabelText('Password'), 'secret123');
    await user.type(screen.getByLabelText('Confirm Password'), 'mismatch');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Name and email missing + password mismatch
    expect(screen.getAllByText('* This field is required.')).toHaveLength(2);
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    expect(mockHandleSignUp).not.toHaveBeenCalled();
  });
});
