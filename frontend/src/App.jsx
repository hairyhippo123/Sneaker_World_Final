import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminWelcome from './components/AdminWelcome';
import ModeratorWelcome from './components/ModeratorWelcome';
import BrandDetail from './components/BrandDetail';
import SneakerDetail from './components/SneakerDetail'; // Import component mới
import AllSneakers from './components/AllSneakers';
import './App.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

const AppRoutes = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/admin/welcome"
                element={
                    user && user.role === 'ADMIN' ? <AdminWelcome /> : <Navigate to="/login" />
                }
            />
            <Route
                path="/moderator/welcome"
                element={
                    user && user.role === 'MODERATOR' ? <ModeratorWelcome /> : <Navigate to="/login" />
                }
            />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/sneaker/:id" element={<SneakerDetail />} />
            <Route path="/all-sneakers" element={<AllSneakers />} />
        </Routes>
    );
};

export default App;