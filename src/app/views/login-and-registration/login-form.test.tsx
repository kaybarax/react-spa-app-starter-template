import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';
import { handleLogin } from '../../controllers/login-controller';

vi.mock('../../controllers/login-controller', () => ({
  handleLogin: vi.fn(),
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
