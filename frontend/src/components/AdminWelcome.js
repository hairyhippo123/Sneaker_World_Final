import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const AdminWelcome = () => {
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
            <h2>Trang quản trị Admin</h2>
            <p>Chào mừng Admin! Bạn có toàn quyền quản lý hệ thống.</p>
            <div className="dashboard-actions">
                <button className="action-button">Quản lý sản phẩm</button>
                <button className="action-button">Quản lý đơn hàng</button>
                <button className="action-button">Quản lý người dùng</button>
            </div>
            <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
        </div>
    );
};

export default AdminWelcome;