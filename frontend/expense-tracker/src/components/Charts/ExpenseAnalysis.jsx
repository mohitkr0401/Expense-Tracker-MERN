// components/Charts/ExpenseAnalysis.jsx
import ApexCharts from 'react-apexcharts';
import { useExpense } from '../../context/ExpenseContext';

export default function ExpenseAnalysis() {
  const { expenses } = useExpense();
  
  // Process data for charts
  const monthlyData = processMonthlyData(expenses);
  const categoryData = processCategoryData(expenses);

  const lineOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    colors: ['#4a90e2'],
    xaxis: {
      categories: monthlyData.labels
    },
    yaxis: {
      title: { text: 'Amount ($)' }
    },
    stroke: { curve: 'smooth', width: 3 }
  };

  const pieOptions = {
    chart: { type: 'donut' },
    labels: categoryData.labels,
    colors: ['#4a90e2', '#6c5ce7', '#00b894', '#d63031', '#fdcb6e'],
    legend: { position: 'bottom' }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h5 className="card-title mb-4">Monthly Spending Trend</h5>
            <ApexCharts
              options={lineOptions}
              series={[{ name: 'Expenses', data: monthlyData.amounts }]}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
      
      <div className="col-lg-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body">
            <h5 className="card-title mb-4">Spending by Category</h5>
            <ApexCharts
              options={pieOptions}
              series={categoryData.amounts}
              type="donut"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function processMonthlyData(expenses) {
  // Group expenses by month
  const monthly = {};
  expenses.forEach(expense => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    monthly[month] = (monthly[month] || 0) + parseFloat(expense.amount);
  });
  
  return {
    labels: Object.keys(monthly),
    amounts: Object.values(monthly)
  };
}

function processCategoryData(expenses) {
  // Group expenses by category
  const categories = {};
  expenses.forEach(expense => {
    categories[expense.category] = (categories[expense.category] || 0) + parseFloat(expense.amount);
  });
  
  return {
    labels: Object.keys(categories),
    amounts: Object.values(categories)
  };
}