import 'chart.js/auto'
import { useState } from 'react'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { useInstantiateChart } from './useInstantiateChart'
import { useGetUniqueDailyVisitorQuery } from '@entities/visitors'
import { useUpdateChart } from './useUpdateChart'

export const VisitorsPage = (): React.JSX.Element => {
  const { canvasRef, chartInstanceRef } = useInstantiateChart()
  const { data, isLoading } = useGetUniqueDailyVisitorQuery()
  useUpdateChart({ chartInstanceRef, visitors: data?.visitorsCount ?? [] })

  const [startDate, setStartDate] = useState<Date>(
    startOfMonth(subMonths(new Date(), 1)),
  )

  const [endDate, setEndDate] = useState<Date>(
    endOfMonth(subMonths(new Date(), 1)),
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '800px' }}>
        <canvas ref={canvasRef}></canvas>
      </Box>
      <Box sx={{ height: '20px' }}>{isLoading && 'Loading...'}</Box>
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
