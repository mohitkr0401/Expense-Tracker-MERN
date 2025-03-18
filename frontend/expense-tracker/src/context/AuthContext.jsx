// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load initial user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('mockCurrentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('mockCurrentUser');
      }
    }
  }, []);

  // Updated login function to check for token instead of user
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API delay if needed
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // Call the backend API for login
      const { data } = await api.post('/auth/login', { email, password });
      console.log('Login response data:', data);
      
      if (data && data.token) {
        // Optionally, you could call /auth/me to fetch full user details.
        // For now, we'll set a dummy user object using the email.
        const loggedUser = { email, name: "User" }; 
        setUser(loggedUser);
        localStorage.setItem('token', data.token);
        // Optionally, store loggedUser details too
        localStorage.setItem('mockCurrentUser', JSON.stringify(loggedUser));
        setSuccess('Login successful!');
        return true;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Registration function remains as before
  const register = async (name, email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (password.trim().length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (users.some(u => u.email.trim().toLowerCase() === email.trim().toLowerCase())) {
        throw new Error('Email already registered');
      }

      const newUser = { 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password: password.trim() 
      };
      const updatedUsers = [...users, newUser];
      
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('mockCurrentUser', JSON.stringify(newUser));
      
      setUser(newUser);
      setSuccess('Registration successful!');
      return true;
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockCurrentUser');
    localStorage.removeItem('token');
    setSuccess('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      success, 
      login, 
      register, 
      logout,
      setError,
      setSuccess
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
