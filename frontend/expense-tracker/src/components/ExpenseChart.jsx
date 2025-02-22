import { useExpense } from '../context/ExpenseContext';
import ApexCharts from 'react-apexcharts';

export default function ExpenseChart() {
  const { expenses } = useExpense();

  // Process data for chart
  const processData = () => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});

    return {
      options: {
        labels: Object.keys(categoryTotals),
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
                  formatter: () => `$${expenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toFixed(2)}`
                }
              }
            }
          }
        }
      },
      series: Object.values(categoryTotals)
    };
  };

  const chartData = processData();

  return (
    <ApexCharts
      options={chartData.options}
      series={chartData.series}
      type="donut"
      height={350}
    />
  );
}