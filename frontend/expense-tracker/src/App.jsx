import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Navigation from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  );
}