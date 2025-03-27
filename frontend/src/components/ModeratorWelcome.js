import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const ModeratorWelcome = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <Header />
            <h2>Trang quản trị Moderator</h2>
            <p>Chào mừng Moderator! Bạn có thể quản lý sản phẩm, danh mục và đơn hàng.</p>
            <div className="dashboard-actions">
                <button className="action-button">Quản lý sản phẩm</button>
                <button className="action-button">Quản lý danh mục</button>
                <button className="action-button">Xem đơn hàng</button>
            </div>
            <Footer />
        </div>
    );
};

export default ModeratorWelcome;