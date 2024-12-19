import type { ChartConfiguration } from 'chart.js'

export const chartConfiguration: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Total',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 20,
        borderSkipped: false,
      },
      {
        label: 'New',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 14,
        borderSkipped: false,
        offset: 100,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Visitors' },
    },
    scales: {
      x: {
        title: { display: true, text: '' },
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        title: { display: true, text: '' },
        beginAtZero: true,
        stacked: false,
        grid: {
          display: true,
        },
      },
    },
  },
}
