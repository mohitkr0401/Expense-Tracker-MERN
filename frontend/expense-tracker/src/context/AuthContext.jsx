// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//     // Add actual authentication logic here
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useState, useEffect } from 'react';

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

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      setUser({ email: foundUser.email, name: foundUser.name });
      localStorage.setItem('mockCurrentUser', JSON.stringify(foundUser));
      setSuccess('Login successful!');
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock registration function
  const register = async (name, email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate password length
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');

      // Check for existing user
      if (users.some(u => u.email === email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = { name, email, password };
      const updatedUsers = [...users, newUser];
      
      // Update storage
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