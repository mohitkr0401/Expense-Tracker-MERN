// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './api/axios';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './components/Layout';

export default function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get('/auth/me');
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setAuthLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (authLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
