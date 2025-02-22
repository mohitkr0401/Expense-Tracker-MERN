import { useExpense } from '../context/ExpenseContext';
import ApexCharts from 'react-apexcharts';
import { useEffect, useState } from 'react';

export default function ExpenseChart() {
  const { expenses } = useExpense();
  const [chartData, setChartData] = useState({ options: {}, series: [] });

  useEffect(() => {
    const processData = () => {
      const categoryTotals = expenses.reduce((acc, expense) => {
        const amount = parseFloat(expense.amount);
        acc[expense.category] = (acc[expense.category] || 0) + amount;
        return acc;
      }, {});

      setChartData({
        options: {
          chart: {
            type: 'donut',
          },
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
                    formatter: () => `$${expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)}`
                  }
                }
              }
            }
          }
        },
        series: Object.values(categoryTotals)
      });
    };

    processData();
  }, [expenses]);

  return (
    <div style={{ minHeight: '400px' }}>
      {expenses.length > 0 ? (
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={350}
        />
      ) : (
        <div className="text-center py-4 text-muted">
          No data available for chart
        </div>
      )}
    </div>
  );
}