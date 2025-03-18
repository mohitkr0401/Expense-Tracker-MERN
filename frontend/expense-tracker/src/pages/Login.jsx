// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLocal, setErrorLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error } = useAuth(); // Use the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorLocal('');

    const success = await login(email, password);
    if (success) {
      navigate('/'); // Redirect to dashboard on successful login
    } else {
      // Optionally show error from AuthContext or set your own error
      setErrorLocal(error || 'Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h2>Welcome Back</h2>
            <p className="text-muted">Sign in to continue</p>
          </div>

          {errorLocal && <Alert variant="danger">{errorLocal}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center text-muted">
              New user? <Link to="/register">Create account</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
