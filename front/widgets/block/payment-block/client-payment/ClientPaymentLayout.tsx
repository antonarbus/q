import { Box } from '@mui/material'
import type { FC, ReactNode } from 'react'

type Props = {
  isPaid: boolean
  paymentLogo: ReactNode
  paymentHeading: ReactNode
  paymentStatusBadge: ReactNode
  paymentAmount: ReactNode
  paymentButton: ReactNode
  devMode?: boolean
}

export const ClientPaymentLayout: FC<Props> = (props) => {
  return (
    <Box
      className='layout'
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: props.isPaid ? 'rgba(76, 175, 80, 0.05)' : 'white',
        borderRadius: '8px',
        // red shadow for .layout boxes in dev mode
        '.layout': {
          boxShadow: props.devMode === true ? '0px 0px 1px 1px red inset' : 'initial',
        },
        // leaf slots are surrounded by green shadow in dev mode
        '.layout:not(:has(.layout))': {
          boxShadow: props.devMode === true ? '0px 0px 2px 2px green' : 'initial',
        },
      }}
    >
      <Box className='layout' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Box className='layout' sx={{ display: 'flex', alignItems: 'center' }}>
          {props.paymentLogo}
        </Box>
        <Box className='layout' sx={{ flex: 1 }}>
          {props.paymentHeading}
        </Box>
        <Box className='layout'>{props.paymentStatusBadge}</Box>
      </Box>
      <Box className='layout'>{props.paymentAmount}</Box>
      <Box className='layout'>{props.paymentButton}</Box>
    </Box>
  )
}
