import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Gọi API đăng nhập
            setError('');
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại! Vui lòng thử lại.');
        }
    };

    const handleLogoClick = () => navigate('/');

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        Seazyyy
                    </h1>
                </div>
                <div className="auth-tabs">
                    <button onClick={() => navigate('/signup')} className="tab inactive">
                        Sign Up
                    </button>
                    <button className="tab active">Log In</button>
                </div>
                <h2 className="auth-title">Log In</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address*</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email or username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="auth-button">Log In</button>
                    <p className="terms">
                        By logging in, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </p>
                    <p className="switch-auth">
                        Need an account? <a href="#" onClick={() => navigate('/signup')}>Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;