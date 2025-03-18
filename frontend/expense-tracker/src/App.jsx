import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './api/axios';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';

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
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}