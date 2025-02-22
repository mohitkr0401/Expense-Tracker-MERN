import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3" 
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Create Account'}
            </Button>
            <div className="text-center text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}