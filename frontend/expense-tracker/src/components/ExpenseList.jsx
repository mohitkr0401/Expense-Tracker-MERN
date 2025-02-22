import { useState } from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';

export default function ExpenseList() {
    // ... existing code
    const { expenses, deleteExpense } = useExpense();
    const [showForm, setShowForm] = useState(false);
    const [editExpense, setEditExpense] = useState(null);
  
    return (
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Expense History</h3>
          <Button 
            variant="primary" 
            onClick={() => setShowForm(true)}
            className="rounded-pill px-4"
          >
            + Add Expense
          </Button>
        </div>
  
        {/* Table Headers */}
        <div className="bg-light rounded-3 p-3 mb-3 d-none d-md-flex">
          <div className="flex-grow-1" style={{ flex: '2' }}>Title</div>
          <div className="text-center" style={{ flex: '1' }}>Amount</div>
          <div className="text-center" style={{ flex: '1' }}>Category</div>
          <div className="text-center" style={{ flex: '1' }}>Date</div>
          <div style={{ flex: '0.5' }}></div>
        </div>
  
        <ListGroup>
          {expenses.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No expenses found. Start by adding your first expense!
            </div>
          ) : expenses.map(expense => (
            <ListGroup.Item 
              key={expense.id}
              className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 py-3"
            >
              <div className="flex-grow-1" style={{ flex: '2' }}>
                <h6 className="mb-1 fw-semibold">{expense.title}</h6>
                {expense.description && (
                  <small className="text-muted">{expense.description}</small>
                )}
              </div>
  
              <div className="text-center" style={{ flex: '1' }}>
                <Badge bg="primary" className="fs-6 px-3 py-2">
                  ${parseFloat(expense.amount).toFixed(2)}
                </Badge>
              </div>
  
              <div className="text-center" style={{ flex: '1' }}>
                <Badge bg="light" className="text-dark fs-6">
                  {categoryIcons[expense.category]}
                  <span className="ms-2">{expense.category}</span>
                </Badge>
              </div>
  
              <div className="text-center" style={{ flex: '1' }}>
                {new Date(expense.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
  
              <div className="d-flex gap-2" style={{ flex: '0.5' }}>
                <Button 
                  variant="link" 
                  className="text-primary p-0"
                  onClick={() => {
                    setEditExpense(expense);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="link" 
                  className="text-danger p-0"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }