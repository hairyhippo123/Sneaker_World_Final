import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const ModeratorWelcome = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    const handleLogoClick = () => {
        navigate('/'); // Chuyển hướng về MainPage
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    Sneaker World
                </h1>
            </div>
            <h2>Trang quản trị Moderator</h2>
            <p>Chào mừng Moderator! Bạn có thể quản lý sản phẩm, danh mục và đơn hàng.</p>
            <div className="dashboard-actions">
                <button className="action-button">Quản lý sản phẩm</button>
                <button className="action-button">Quản lý danh mục</button>
                <button className="action-button">Xem đơn hàng</button>
            </div>
            <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
        </div>
    );
};

export default ModeratorWelcome;