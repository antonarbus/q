import { Box, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux'

export const QuotationId = (): React.ReactNode => {
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

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
