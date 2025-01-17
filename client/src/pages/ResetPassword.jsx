import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import HOME from "../assets/SLAB-HOME.svg";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [resetPassword] = useMutation(RESET_PASSWORD);  

    // Password validation
    const updatePasswordValidity = () => {
        const isMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        setPasswordValid(isMinLength && hasUppercase && hasNumber);
    };

    // Check if the passwords match
    useEffect(() => {
        setPasswordsMatch(password && confirmPassword && password === confirmPassword);
    }, [password, confirmPassword]);

    // Update password validity on password change
    useEffect(() => {
        updatePasswordValidity();
    }, [password]);

    // Redirect if already logged in
    useEffect(() => {
        const storedToken = Auth.getToken();
        if (storedToken && Auth.loggedIn() && !token) {
            navigate('/');
        }
    }, [navigate, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordsMatch || !passwordValid) return;

        try {
            await resetPassword({ variables: { token, password } });
            setShowPopup(true);
        } catch (err) {
            console.error('Failed to reset password', err);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/');
    };

    return (
        <div className="reset-container reset">
            <img src={HOME} className="slab" alt="SLAB Logo" />
            <h3>Reset Your Password</h3>
            <form onSubmit={handleSubmit}>
                {/* New Password Input */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    required
                />
                    
                {/* Password Requirements List */}
                <ul className="password-requirements">
                    <li>Password Must Contain:</li>
                    <li style={{ color: password.length >= 8 ? 'green' : 'grey' }}>
                        At least 8 characters
                    </li>
                    <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'grey' }}>
                        At least 1 uppercase letter
                    </li>
                    <li style={{ color: /\d/.test(password) ? 'green' : 'grey' }}>
                        At least 1 number
                    </li>
                </ul>

                {/* Confirm Password Input */}
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    style={{
                        backgroundColor: confirmPassword
                            ? (passwordsMatch ? '#d4edda' : '#f8d7da')
                            : 'white',
                        borderColor: passwordsMatch ? '#28a745' : '#dc3545'
                    }}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!passwordsMatch || !passwordValid}
                    className={passwordsMatch && passwordValid ? 'enabled-button' : 'disabled-button'}
                >
                    Reset Password
                </button>
            </form>

            {/* Success Popup Modal */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>Password reset successfully!</p>
                        <button className="button" onClick={handlePopupClose}>Return to Home</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
