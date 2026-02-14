import { Box, Tooltip } from '@mui/material'
import { useSelector } from '@shared/lib/redux'

export const QuotationId = (): React.JSX.Element => {
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
