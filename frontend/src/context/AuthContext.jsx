import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password
            }, {
                withCredentials: true // Gửi cookie JSESSIONID
            });
            // Giả sử server trả về vai trò trong response (tùy chỉnh nếu cần)
            const role = username === 'admin' ? 'ADMIN' : 'CUSTOMER'; // Tạm thời hardcode
            setUser({role});
            navigate('/'); // Chuyển hướng đến MainPage
        } catch (error) {
            throw new Error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
        }
    };

    const logout = async () => {
        await axios.post('http://localhost:8080/logout', {}, {withCredentials: true});
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};