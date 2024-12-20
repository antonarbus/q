import 'chart.js/auto'
import { useState } from 'react'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { format, subDays } from 'date-fns'
import { useInstantiateChart } from './useInstantiateChart'
import { useGetUniqueDailyVisitorQuery } from '@entities/visitors'
import { useUpdateChart } from './useUpdateChart'

const today = new Date()
const thirtyDaysAgo = subDays(today, 30)

export const VisitorsPage = (): React.JSX.Element => {
  const { canvasRef, chartInstanceRef } = useInstantiateChart()

  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(today)

  const { data, isLoading } = useGetUniqueDailyVisitorQuery({
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
  })

  useUpdateChart({ chartInstanceRef, visitors: data?.visitorsCount ?? [] })

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
