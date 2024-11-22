import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations'; // Define this mutation for reset
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({
        variables: { token, password },
      });
      alert('Password reset successfully');
      navigate('/login'); // Use navigate instead of history.push
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
