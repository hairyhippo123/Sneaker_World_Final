import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import AdminWelcome from './components/AdminWelcome';
import ModeratorWelcome from './components/ModeratorWelcome';
import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
  );
};

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Route
            path="/home"
            element={
              user && user.role === 'CUSTOMER' ? <HomePage /> : <Navigate to="/login" />
            }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default App;