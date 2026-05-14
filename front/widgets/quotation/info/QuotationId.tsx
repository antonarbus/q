import { Box, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { FC } from 'react'

export const QuotationId: FC = () => {
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)

  if (permissionLevel === 'FORBIDDEN' || permissionLevel === 'UNKNOWN') {
    return null
  }

  if (quotationId === 'new') {
    return null
  }

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
