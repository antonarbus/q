import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js'
import 'chart.js/auto'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns'
import { chartConfiguration } from './chartConfiguration'

const data = [
  { date: '2024-11-25', count: 43, new: 7 },
  { date: '2024-11-26', count: 19, new: 17 },
  { date: '2024-11-27', count: 10, new: 7 },
]

export const VisitorsPage = (): React.JSX.Element => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  const [startDate, setStartDate] = useState<Date>(
    startOfMonth(subMonths(new Date(), 1)),
  )

  const [endDate, setEndDate] = useState<Date>(
    endOfMonth(subMonths(new Date(), 1)),
  )

  const getFilteredData = () =>
    data.filter((item) => {
      const date = parseISO(item.date)

      return isAfter(date, startDate) && isBefore(date, endDate)
    })

  const updateChart = (): void => {
    const filteredData = getFilteredData()

    const labels = filteredData.map((item) =>
      format(parseISO(item.date), 'MMM dd'),
    )

    const countData = filteredData.map((item) => item.count)
    const newData = filteredData.map((item) => item.new)

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = labels

      if (chartInstanceRef.current.data.datasets[0]) {
        chartInstanceRef.current.data.datasets[0].data = countData
      }

      if (chartInstanceRef.current.data.datasets[1]) {
        chartInstanceRef.current.data.datasets[1].data = newData
      }

      chartInstanceRef.current.update()
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, chartConfiguration)
      }
    }

    updateChart()

    return (): void => {
      chartInstanceRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    updateChart()
  }, [startDate, endDate, data])

  return (
    <Box>
      <canvas ref={chartRef}></canvas>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          mt: '30px',
        }}
      >
        <DatePicker
          label='Start Date'
          format='dd.MM.yyyy'
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue ?? startDate)
          }}
        />
        <DatePicker
          label='End Date'
          format='dd.MM.yyyy'
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue ?? endDate)
          }}
        />
      </Box>
    </Box>
  )
}
