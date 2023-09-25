import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  const buildChart = (): void => {
    if (!chartRef.current) return

    const myChartRef = chartRef.current.getContext('2d')

    if (!myChartRef) return

    // eslint-disable-next-line no-new
    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  useEffect(() => {
    if (chartRef.current) {
      buildChart()
    }
  }, [])

  return (
    <div>
      <canvas id='myChart' ref={chartRef} />
    </div>
  )
}
