import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!agree) {
            setError('Bạn phải đồng ý với Điều khoản và Chính sách bảo mật!');
            return;
        }
        setError('Chức năng đăng ký chưa được triển khai!');
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
                    <button className="tab active">Sign Up</button>
                    <button onClick={() => navigate('/login')} className="tab inactive">
                        Log In
                    </button>
                </div>
                <h2 className="auth-title">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>First Name*</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name*</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address*</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                        <p className="password-hint">
                            At least 8 characters, 1 uppercase letter, 1 number & 1 symbol
                        </p>
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <label>
                            I have read and agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
                        </label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="auth-button">Sign Up</button>
                    <p className="switch-auth">
                        Already have an account? <a href="#" onClick={() => navigate('/login')}>Log In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;