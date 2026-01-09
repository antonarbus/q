import { useGetUniqueDailyVisitorCountQuery } from '@entity/visitor/api/useGetUniqueDailyVisitorCountQuery'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { format, subDays } from 'date-fns'
import { type JSX, useState } from 'react'
import { useChart } from '@shared/lib/chart-js'
import { useUpdateChart } from '@feature/visitors/update-chart-acc-to-date-range'

const today = new Date()
const thirtyDaysAgo = subDays(today, 30)

export const VisitorListPage = (): JSX.Element => {
  const chart = useChart()
  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(today)

  const getUniqueDailyVisitorCountQuery = useGetUniqueDailyVisitorCountQuery({
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
  })

  useUpdateChart({
    chartInstanceRef: chart.chartInstanceRef,
    visitorList: getUniqueDailyVisitorCountQuery.data?.visitorList ?? [],
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
        <canvas ref={chart.canvasRef} />
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
