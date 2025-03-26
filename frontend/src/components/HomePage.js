import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/home-page', {
                    withCredentials: true,
                });
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching welcome message:', error);
                navigate('/login');
            }
        };

        if (user && user.role === 'CUSTOMER') {
            fetchWelcomeMessage();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Home Page</h2>
            <p>{message}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;