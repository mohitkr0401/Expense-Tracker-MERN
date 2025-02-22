import { useExpense } from '../context/ExpenseContext';
import ApexCharts from 'react-apexcharts';

export default function ExpenseChart() {
  const { expenses } = useExpense();

  // Process data for chart
  const chartData = {
    options: {
      labels: expenses.map(exp => exp.category),
      colors: ['#4a90e2', '#6c5ce7', '#00b894', '#d63031', '#fdcb6e'],
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        pie: {
          donut: {
              labels: {
                  show: true,
                  total: {
                      show: true,
                      label: 'Total Expenses',
                      color: '#373d3f',
                      formatter: (w) => {
                          return '$' + w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                      }
                  }
              }
          }
        }
      }
    },
    series: expenses.map(exp => parseFloat(exp.amount))
  };

  return (
    <ApexCharts
      options={chartData.options}
      series={chartData.series}
      type="donut"
      height={350}
    />
  );
}