import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import { format } from 'date-fns'

export const DateCellRenderer = (
  params: ICellRendererParams<unknown, Date>,
): React.ReactNode => {
  if (params.value === undefined) {
    return null
  }

  if (params.value === null) {
    return null
  }

  const date = format(params.value, 'dd.MM.yyyy')
  const time = format(params.value, 'HH:mm')

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: '12px',
          lineHeight: '12px',
        }}
      >
        {date}
      </Box>
      <Box
        sx={{
          color: 'grey',
          textAlign: 'center',
          fontSize: '10px',
          lineHeight: '10px',
        }}
      >
        {time}
      </Box>
    </>
  )
}
