import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="header-container">
            {/* Header chính */}
            <header className="header">
                <div className="header-left">
                    <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        Sneaker World
                    </h1>
                </div>
                <div className="header-center">
                    <input
                        type="text"
                        placeholder="Search for brand, color, etc."
                        className="search-bar"
                    />
                </div>
                <div className="header-right">
                    <div className="utility-links">
                        <a href="#">News</a>
                        <a href="#">About</a>
                        <a href="#">Help</a>
                        <a href="#">Sell</a>
                    </div>
                    <div className="auth-buttons">
                        {user ? (
                            <>
                                <span>Xin chào, {user.role}</span>
                                <button onClick={handleLogout} className="logout-button">
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="login-button"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="signup-button"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Thanh điều hướng phụ */}
            <nav className="nav-links">
                <a href="#">Brands</a>
                <a href="#">New</a>
                <a href="#">Men</a>
                <a href="#">Women</a>
                <a href="#">Kids</a>
                <a href="#">Sneakers</a>
                <a href="#">Shoes</a>
                <a href="#">Apparel</a>
                <a href="#">Accessories</a>
                <a href="#">More Category</a>
                <a href="#">Deals</a>
            </nav>
        </div>
    );
};

export default Header;