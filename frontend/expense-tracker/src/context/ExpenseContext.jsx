import { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({
    category: 'all',
    minAmount: '',
    maxAmount: '',
    searchQuery: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const filteredExpenses = expenses.filter(expense => {
    return (
      (filter.category === 'all' || expense.category === filter.category) &&
      (!filter.minAmount || expense.amount >= filter.minAmount) &&
      (!filter.maxAmount || expense.amount <= filter.maxAmount) &&
      expense.title.toLowerCase().includes(filter.searchQuery.toLowerCase())
    );
  });

  return (
    <ExpenseContext.Provider value={{
      expenses: filteredExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      filter,
      setFilter
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpense = () => useContext(ExpenseContext);