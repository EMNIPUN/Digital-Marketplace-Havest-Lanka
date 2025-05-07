import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const SalesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8005/api/all-payments')
      .then((response) => {
        const rawData = response.data;

        
        const successfulPayments = rawData.filter(p => p.status_code === '2');

        
        const salesByDate = {};
        successfulPayments.forEach(payment => {
          const date = new Date(payment.createdAt).toISOString().split('T')[0]; 
          const amount = parseFloat(payment.payhere_amount);
          salesByDate[date] = (salesByDate[date] || 0) + amount;
        });

        const dates = Object.keys(salesByDate).sort();
        const amounts = dates.map(date => salesByDate[date]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Daily Sales (LKR)',
              data: amounts,
              fill: true,
              backgroundColor: 'rgba(34, 197, 94, 0.2)', 
              borderColor: '#22C55E',
              tension: 0.3,
            },
          ],
        });
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-2xl ">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sales Overview</h2>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p className="text-center text-gray-500">Loading chart...</p>
      )}
    </div>
  );
};

export default SalesChart;
