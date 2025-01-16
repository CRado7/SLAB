import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'; // Importing AuthService for token check if needed

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetPassword] = useMutation(RESET_PASSWORD);  

    useEffect(() => {
      console.log('ResetPassword Mounted');
      console.log('Token:', Auth.getToken());
      console.log('Is logged in:', Auth.loggedIn());
      // Only redirect if the user is logged in and not already on the reset page
      const token = Auth.getToken();
      if (token && Auth.loggedIn() && !token) {
          navigate('/');
      }
  }, [navigate]); // Removed location dependency to avoid triggering on path change
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await resetPassword({ variables: { token, password } });
        alert('Password reset successfully');

        // Clear the token and wait for the next render cycle
        localStorage.removeItem('id_token');
        
        navigate('/');  // Redirect immediately
    } catch (err) {
        setError('Failed to reset password');
    }
};

    return (
        <div>
            <h2>Reset Your Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
