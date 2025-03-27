import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        setLoading(false);
    }, []);

    const login = (username, password) => {
        console.log('Đăng nhập với:', username, password);
        if (username === 'admin') {
            setUser({ role: 'ADMIN' });
            navigate('/admin/welcome');
        } else if (username === 'moderator') {
            setUser({ role: 'MODERATOR' });
            navigate('/moderator/welcome');
        } else if (username === 'customer') {
            setUser({ role: 'CUSTOMER' });
            navigate('/'); // Chuyển hướng đến MainPage cho CUSTOMER
        } else {
            throw new Error('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/'); // Chuyển hướng về MainPage cho tất cả vai trò
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};