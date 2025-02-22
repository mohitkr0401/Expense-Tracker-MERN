import { useState } from 'react';
import { ListGroup, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';
import  categoryIcons  from '../utils/categoryIcons'; 

export default function ExpenseList() {
  const { expenses, deleteExpense, filter, setFilter } = useExpense();
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

      <Row className="mb-4 g-3">
        <Col md={3}>
          <Form.Select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
          </Form.Select>
        </Col>
        
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Min Amount"
            value={filter.minAmount}
            onChange={(e) => setFilter({ ...filter, minAmount: e.target.value })}
          />
        </Col>
        
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Max Amount"
            value={filter.maxAmount}
            onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value })}
          />
        </Col>
        
        <Col md={3}>
          <Form.Control
            type="search"
            placeholder="Search expenses..."
            value={filter.searchQuery}
            onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
          />
        </Col>
      </Row>

      <ListGroup>
        {expenses.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No expenses found. Start by adding your first expense!
          </div>
        ) : expenses.map(expense => (
          <ListGroup.Item 
            key={expense.id}
            className="d-flex justify-content-between align-items-center py-3 hover-shadow"
          >
            <div className="d-flex align-items-center gap-3">
              <div className="bg-light rounded-circle p-2">
                {categoryIcons[expense.category]}
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">{expense.title}</h6>
                <small className="text-muted">
                  {new Date(expense.date).toLocaleDateString()} • {expense.category}
                </small>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <Badge bg="primary" className="fs-6 px-3 py-2">
                ${parseFloat(expense.amount).toFixed(2)}
              </Badge>
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