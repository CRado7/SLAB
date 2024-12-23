import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN, REQUEST_PASSWORD_RESET } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [login, { error, data }] = useMutation(LOGIN);
  const [requestPasswordReset, { error: resetError, data: resetData }] = useMutation(REQUEST_PASSWORD_RESET);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleForgotPasswordChange = (event) => {
    setResetEmail(event.target.value);
  };

  // submit login form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  // handle forgot password form submission
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPasswordReset({
        variables: { email: resetEmail },
      });
      alert('A password reset link has been sent to your email!');
      setForgotPassword(false);
    } catch (error) {
      console.error('Error sending reset link:', error);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-12">
        <div className="card1">
          <h4 className="card-header1 text-dark p-2">Login</h4>
          <div className="card-body1">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/SLAB/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                {!forgotPassword ? (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-block btn-dark text-white"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <input
                      className="form-input"
                      placeholder="Enter your email"
                      type="email"
                      value={resetEmail}
                      onChange={handleForgotPasswordChange}
                      required
                    />
                    <button
                      className="btn btn-block btn-dark text-white"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Send Reset Link
                    </button>
                    <button
                      className="btn btn-block btn-light text-dark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setForgotPassword(false)}
                    >
                      Back to Login
                    </button>
                  </form>
                )}
              </>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}

            {resetError && (
              <div className="my-3 p-3 bg-danger text-white">
                {resetError.message}
              </div>
            )}

            {resetData && !resetError && (
              <p className="text-success">Password reset link sent!</p>
            )}

            {!forgotPassword && (
              <div>
                <button onClick={() => setForgotPassword(true)} className="forgot-password-btn">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
