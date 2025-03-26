import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Lưu thông tin user (bao gồm vai trò)
    const [loading, setLoading] = useState(true);

    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Gọi API để kiểm tra phiên (dùng JSESSIONID từ cookie)
                const response = await axios.get('http://localhost:8080/api/homepage', {
                    withCredentials: true, // Gửi cookie (JSESSIONID)
                });
                // Giả sử backend trả về thông tin user sau khi đăng nhập thành công
                // Đây là bước bạn có thể gọi API để lấy thông tin user nếu backend hỗ trợ
                setUser(null); // Ban đầu chưa đăng nhập
            } catch (error) {
                console.error('Error checking auth:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Hàm đăng nhập
    const login = async (username, password) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                new URLSearchParams({
                    username: username,
                    password: password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true, // Gửi và nhận cookie (JSESSIONID)
                }
            );

            // Backend sẽ chuyển hướng và trả về Location header
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
                // Xác định vai trò dựa trên redirect URL
                if (redirectUrl.includes('/api/admin/welcome-admin')) {
                    setUser({ role: 'ADMIN' });
                } else if (redirectUrl.includes('/api/moderator/welcome-moderator')) {
                    setUser({ role: 'MODERATOR' });
                } else if (redirectUrl.includes('/api/homepage')) {
                    setUser({ role: 'CUSTOMER' });
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Hàm đăng xuất
    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};