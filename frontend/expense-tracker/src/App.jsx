import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './pages/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import Navigation from './components/Navbar';

function App() {
  return (
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
  );
}

export default App;