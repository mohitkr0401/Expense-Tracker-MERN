import { useState } from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Expenses</h3>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Add Expense
        </Button>
      </div>

      <ListGroup>
        {expenses.map(expense => (
          <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{expense.title}</h5>
              <small className="text-muted">
                {new Date(expense.date).toLocaleDateString()} - {expense.category}
              </small>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Badge bg="primary" className="fs-6">
                ${expense.amount}
              </Badge>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => {
                  setEditExpense(expense);
                  setShowForm(true);
                }}
              >
                Edit
              </Button>
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ExpenseForm 
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setEditExpense(null);
        }}
        expenseToEdit={editExpense}
      />
    </div>
  );
}