import { Row, Col, Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';

export default function Dashboard() {
  const chartOptions = {
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Food', 'Transport', 'Shopping', 'Bills'],
    },
    series: [30, 40, 45, 50],
  };

  return (
    <div className="py-4">
      <h2 className="mb-4">Dashboard</h2>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm bg-success text-white">
            <Card.Body>
              <h5>Total Balance</h5>
              <h2>$5,000</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5>Income</h5>
              <h2 className="text-success">$3,000</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5>Expenses</h5>
              <h2 className="text-danger">$2,000</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5>Savings</h5>
              <h2 className="text-primary">$1,000</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Recent Transactions</h5>
              {/* Add transaction list component */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Expense Distribution</h5>
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}