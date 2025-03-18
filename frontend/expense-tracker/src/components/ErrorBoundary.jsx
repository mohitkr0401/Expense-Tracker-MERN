import { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4">
          <Alert variant="danger" className="text-center">
            <h4>Something went wrong!</h4>
            <p className="mb-3">{this.state.error.message}</p>
            <Button 
              variant="primary"
              onClick={this.handleReset}
            >
              Try Again
            </Button>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}