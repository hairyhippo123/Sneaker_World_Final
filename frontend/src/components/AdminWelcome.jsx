import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const AdminWelcome = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="dashboard-container admin-dashboard">
            <Header />
            <h2>Trang quản trị Admin</h2>
            <p>Chào mừng Admin! Bạn có toàn quyền quản lý hệ thống.</p>
            <div className="dashboard-actions">
                <button className="action-button">Quản lý sản phẩm</button>
                <button className="action-button">Quản lý đơn hàng</button>
                <button className="action-button">Quản lý người dùng</button>
            </div>
            <Footer />
        </div>
    );
};

export default AdminWelcome;