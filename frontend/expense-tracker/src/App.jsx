import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Container } from 'react-bootstrap'; 
import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <ExpenseProvider>
      {/* Your existing app structure */}
      <AuthProvider>
      <BrowserRouter>
        <Navigation />
        
        <main className="py-4">
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* Add other protected routes */}
            </Routes>
          </Container>
        </main>
      </BrowserRouter>
    </AuthProvider>
      <ExpenseChart />
      <ExpenseList />
    </ExpenseProvider>
  );
}