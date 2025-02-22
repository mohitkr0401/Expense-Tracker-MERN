import { Container, Row, Col, Card } from 'react-bootstrap';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseList from '../components/ExpenseList';
import { useExpense } from '../context/ExpenseContext';

export default function Dashboard() {
  const { expenses } = useExpense();

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const lastExpense = expenses[expenses.length - 1];

  return (
    <Container className="py-4">
      <Row className="g-4 mb-4">
        {/* Summary Cards */}
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="text-muted mb-3">Total Expenses</h5>
              <h2 className="text-primary">${totalExpenses.toFixed(2)}</h2>
              <small className="text-muted">Lifetime total</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="text-muted mb-3">Recent Expense</h5>
              {lastExpense ? (
                <>
                  <h4 className="text-success">${lastExpense.amount}</h4>
                  <p className="mb-0">{lastExpense.title}</p>
                </>
              ) : (
                <p className="text-muted">No expenses yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="text-muted mb-3">Categories Used</h5>
              <h2 className="text-info">
                {new Set(expenses.map(exp => exp.category)).size}
              </h2>
              <small className="text-muted">Unique categories</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="mb-4">Monthly Spending Analysis</h5>
              <ExpenseChart />
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="mb-4">Quick Actions</h5>
              <div className="d-grid gap-3">
                <Button variant="primary" size="lg">
                  Set Budget
                </Button>
                <Button variant="outline-primary" size="lg">
                  Export Data
                </Button>
                <Button variant="outline-secondary" size="lg">
                  View Reports
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Expense List */}
      <Row>
        <Col>
          <ExpenseList />
        </Col>
      </Row>
    </Container>
  );
}