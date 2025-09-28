import 'chart.js/auto'
import { useState } from 'react'
import type { JSX } from 'react'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { format, subDays } from 'date-fns'
import { useInstantiateChart } from './useInstantiateChart'
import { useGetUniqueDailyVisitorCountQuery } from '@entities/visitor'
import { useUpdateChart } from './useUpdateChart'

const today = new Date()
const thirtyDaysAgo = subDays(today, 30)

export const VisitorListPage = (): JSX.Element => {
  const { canvasRef, chartInstanceRef } = useInstantiateChart()

  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(today)

  const getUniqueDailyVisitorCountQuery = useGetUniqueDailyVisitorCountQuery({
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
  })

  useUpdateChart({
    chartInstanceRef,
    visitors: getUniqueDailyVisitorCountQuery.data?.visitorsCount ?? [],
  })

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
        <canvas ref={canvasRef} />
      </Box>
      <Box sx={{ height: '20px' }}>
        {getUniqueDailyVisitorCountQuery.isLoading === true
          ? 'Loading...'
          : null}
      </Box>
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
          format='dd.MM.yyyy'
          label='Start Date'
          onChange={(newValue) => {
            setStartDate(newValue ?? startDate)
          }}
          value={startDate}
        />
        <DatePicker
          format='dd.MM.yyyy'
          label='End Date'
          onChange={(newValue) => {
            setEndDate(newValue ?? endDate)
          }}
          value={endDate}
        />
      </Box>
    </Box>
  )
}
