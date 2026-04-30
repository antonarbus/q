import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box } from '@mui/material'
import type { FC, ReactNode } from 'react'

type Props = {
  paymentLogo: ReactNode
  paymentHeading: ReactNode
  paymentStatusBadge: ReactNode
  paymentAmount: ReactNode
  paymentCurrency: ReactNode
  paymentButtonLabel: ReactNode
  paymentLink: ReactNode
  paymentLinkGenerateButton: ReactNode
  devMode?: boolean
}

export const OwnerPaymentLayout: FC<Props> = (props) => {
  const isPaid = reduxHolder.useSelector((state) => state.quotation.paidAt !== null)

  return (
    <Box
      className='layout'
      sx={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: isPaid ? 'rgba(76, 175, 80, 0.05)' : undefined,
        // red shadow for .layout boxes in dev mode
        '.layout': {
          boxShadow: props.devMode === true ? '0px 0px 1px 1px red inset' : 'initial',
        },
        // widgets are surrounded by green shadow and have low opacity in dev mode
        '.layout:not(:has(.layout))': {
          boxShadow: props.devMode === true ? '0px 0px 2px 2px green' : 'initial',
        },
      }}
    >
      {/* Heading row */}
      <Box
        className='layout'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Box className='layout' sx={{ display: 'flex', alignItems: 'center' }}>
          {props.paymentLogo}
        </Box>
        <Box className='layout' sx={{ flex: 1 }}>
          {props.paymentHeading}
        </Box>
        <Box className='layout'>{props.paymentStatusBadge}</Box>
      </Box>

      {/* Amount + Currency row */}
      <Box
        className='layout'
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
        }}
      >
        <Box
          className='layout'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 2,
          }}
        >
          {props.paymentAmount}
        </Box>

        <Box
          className='layout'
          sx={{
            flex: 1,
          }}
        >
          {props.paymentCurrency}
        </Box>
      </Box>

      {/* Pay button label editor — shown as a full-width button preview */}
      <Box
        className='layout'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 16px',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: '6px',
          cursor: 'text',
          '& p': {
            margin: 0,
            color: 'text.secondary',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          },
          '& .tiptap': { padding: '0' },
        }}
      >
        {props.paymentButtonLabel}
      </Box>

      {/* Payment link section */}
      <Box className='layout'>{props.paymentLink}</Box>
      <Box className='layout' sx={{ textAlign: 'center' }}>
        {props.paymentLinkGenerateButton}
      </Box>
    </Box>
  )
}
