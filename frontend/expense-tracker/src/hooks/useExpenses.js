import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async (params = {}) => {
    try {
      const { data } = await api.get('/expenses', { params });
      setExpenses(data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const { data } = await api.post('/expenses', expenseData);
      setExpenses(prev => [...prev, data]);
    } catch (err) {
      throw err.response?.data?.error || 'Failed to add expense';
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
    } catch (err) {
      throw err.response?.data?.error || 'Failed to delete expense';
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, error, fetchExpenses, addExpense, deleteExpense };
}