import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useExpense } from '../context/ExpenseContext';

export default function ExpenseForm({ show, handleClose, expenseToEdit }) {
  const { addExpense, updateExpense } = useExpense();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Load data when editing
  useEffect(() => {
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (expenseToEdit) {
      updateExpense(formData);
    } else {
      addExpense(formData);
    }
    
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{expenseToEdit ? 'Edit' : 'Add'} Expense</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </Form.Group>

          {/* Add other form fields similarly */}

        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {expenseToEdit ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}