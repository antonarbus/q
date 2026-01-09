import { Box, Tooltip } from '@mui/material'
import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'

export const QuotationId = (): JSX.Element => {
  const quotationId = useSelector((state) => state.quotation.id)

  return (
    <Tooltip title='Quotation ID'>
      <Box
        sx={{
          fontWeight: 500,
          color: 'grey',
        }}
      >
        {quotationId}
      </Box>
    </Tooltip>
  )
}
