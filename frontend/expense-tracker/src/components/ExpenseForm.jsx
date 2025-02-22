import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import categoryIcons from '../utils/categoryIcons';
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
    } else {
      // Reset form when adding new
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (expenseToEdit) {
      updateExpense({ ...formData, id: expenseToEdit.id });
    } else {
      addExpense({ ...formData, id: Date.now() });
    }
    
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-4">
          {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-0">
          <Row className="g-3">
            <Col md={6}>
              <FloatingLabel label="Title" className="mb-3">
                <Form.Control
                  type="text"
                  required
                  placeholder="Dinner at Restaurant"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Amount" className="mb-3">
                <Form.Control
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {Object.entries(categoryIcons).map(([category, icon]) => (
                    <Button
                      key={category}
                      variant={formData.category === category ? 'primary' : 'outline-primary'}
                      className="d-flex align-items-center gap-2 rounded-pill px-3"
                      onClick={() => setFormData({ ...formData, category })}
                    >
                      {icon}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  selected={new Date(formData.date)}
                  onChange={(date) => setFormData({ ...formData, date: date.toISOString().split('T')[0] })}
                  className="form-control"
                  dateFormat="MMM d, yyyy"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <FloatingLabel label="Description (Optional)">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add any additional notes"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="px-4">
            {expenseToEdit ? 'Update' : 'Add Expense'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};