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
            await login(email, password);
            setError('');
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại! Vui lòng thử lại.');
        }
    };

    const handleLogoClick = () => {
        navigate('/'); // Chuyển hướng về MainPage
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        Sneaker World
                    </h1>
                </div>
                <div className="auth-tabs">
                    <button onClick={() => navigate('/signup')} className="tab inactive">
                        Sign Up
                    </button>
                    <button className="tab active">Log In</button>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password*"
                            required
                        />
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="auth-button">Log In</button>
                    <p className="terms">
                        By logging in, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;