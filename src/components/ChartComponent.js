// src/components/ChartComponent.js
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Data',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [data]);

  return (
    <canvas ref={chartRef}></canvas>
  );
};

export default ChartComponent;
