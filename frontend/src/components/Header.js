import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Header = ({showRoleButton, role, onRoleClick}) => {
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
                        Sneazyyy
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
                        {user ? (
                            <>
                                {showRoleButton && (
                                    <button className="role-button" onClick={onRoleClick}>
                                        {role === 'MODERATOR' ? 'Moderator' : 'Admin'}
                                    </button>
                                )}
                                <button className="logout-button" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="auth-buttons">
                                <button className="login-button" onClick={() => navigate('/login')}>
                                    Log In
                                </button>
                                <button className="signup-button" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </button>
                            </div>
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