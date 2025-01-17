import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Popup.css';

const SignupPopup = ({ showSignup, onClose }) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [passwordValid, setPasswordValid] = useState(false);

  // Handle form input changes and validate the password in real-time
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });

    if (name === 'password') {
      // Check if the password meets the requirements
      const isMinLength = value.length >= 8;
      const hasUppercase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);

      setPasswordValid(isMinLength && hasUppercase && hasNumber);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!passwordValid) return;

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  // Prevent rendering if not visible
  if (!showSignup) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h4 className="popup-header">Sign Up</h4>
        <div className="popup-body">
          {data ? (
            <p>Success! You may now use the application.</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              {/* Username Input */}
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                required
              />

              {/* Email Input */}
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />

              {/* Password Input */}
              <input
                className="form-input"
                placeholder="Password (at least 8 characters)"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
              />

              {/* Password Requirements List */}
              <ul className="password-requirements">
                <li>Password Must Contain:</li>
                <li style={{ color: formState.password.length >= 8 ? 'green' : 'grey' }}>
                  At least 8 characters
                </li>
                <li style={{ color: /[A-Z]/.test(formState.password) ? 'green' : 'grey' }}>
                  At least 1 uppercase letter
                </li>
                <li style={{ color: /\d/.test(formState.password) ? 'green' : 'grey' }}>
                  At least 1 number
                </li>
              </ul>

              {/* Submit Button */}
              <button
                className="valid-button"
                style={{ cursor: passwordValid ? 'pointer' : 'not-allowed' }}
                type="submit"
                disabled={!passwordValid}
              >
                Submit
              </button>
            </form>
          )}

          {/* Error Handling */}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
