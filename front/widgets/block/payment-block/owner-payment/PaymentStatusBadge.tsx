import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const PaymentStatusBadge: FC = () => {
  const paidAt = reduxHolder.useSelector((state) => state.quotation.paidAt)
  const isPaid = paidAt !== null

  if (isPaid === false) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '11px',
        color: 'success.main',
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          bgcolor: isPaid ? 'success.main' : 'success.light',
        }}
      />
      {isPaid ? 'Paid' : 'Active'}
    </Box>
  )
}
