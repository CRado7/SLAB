import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, REQUEST_PASSWORD_RESET } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Popup.css'; // Add styles for popup

const LoginPopup = ({ showLogin, onClose }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [login, { error, data }] = useMutation(LOGIN);
  const [requestPasswordReset, { error: resetError, data: resetData }] = useMutation(REQUEST_PASSWORD_RESET);

  // Update state based on form input changes
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

  // Submit login form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      onClose(); // Close popup on successful login
    } catch (e) {
      console.error(e);
    }
  };

  // Handle forgot password form submission
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

  if (!showLogin) return null; // Do not render if popup is not active

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h4 className="popup-header">Login</h4>
        <div className="popup-body">
          {data ? (
            <p>Success! You're logged in.</p>
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
                  <button type="submit" className="button">
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
                  <button type="submit" className="button">
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => setForgotPassword(false)}
                  >
                    Back to Login
                  </button>
                </form>
              )}
            </>
          )}
          {error && <p className="error-message">{error.message}</p>}
          {resetError && <p className="error-message">{resetError.message}</p>}
          {resetData && <p className="success-message">Password reset link sent!</p>}
          {!forgotPassword && (
            <button onClick={() => setForgotPassword(true)} className="button">
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
