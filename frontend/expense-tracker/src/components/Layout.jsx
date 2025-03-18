// src/components/Layout.jsx
import Navigation from './Navbar';
import { AuthProvider } from '../context/AuthContext';
import { ExpenseProvider } from '../context/ExpenseContext';

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Navigation />
        <main>{children}</main>
      </ExpenseProvider>
    </AuthProvider>
  );
}
