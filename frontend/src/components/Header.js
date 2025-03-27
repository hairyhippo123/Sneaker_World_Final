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
        <header className="header">
            <div className="header-left">
                <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    Sneaker World
                </h1>
            </div>
            <div className="header-center">
                <input type="text" placeholder="Tìm kiếm thương hiệu, màu sắc, v.v." className="search-bar" />
            </div>
            <div className="header-right">
                <nav className="nav-links">
                    <a href="#">Thương hiệu</a>
                    <a href="#">Mới</a>
                    <a href="#">Nam</a>
                    <a href="#">Nữ</a>
                    <a href="#">Trẻ em</a>
                    <a href="#">Sneakers</a>
                    <a href="#">Giày</a>
                    <a href="#">Trang phục</a>
                    <a href="#">Phụ kiện</a>
                    <a href="#">Danh mục khác</a>
                    <a href="#">Ưu đãi</a>
                </nav>
                <div className="auth-buttons">
                    {user ? (
                        <>
                            <span>Xin chào, {user.role}</span>
                            <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="login-button">Đăng nhập</button>
                            <button onClick={() => navigate('/signup')} className="signup-button">Đăng ký</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;