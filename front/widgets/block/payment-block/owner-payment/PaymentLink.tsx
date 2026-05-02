import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Box, IconButton, Tooltip } from '@mui/material'
import type { FC } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { toast } from 'sonner'

export const PaymentLink: FC = () => {
  const block = useBlock()

  const stripePaymentLinkUrl = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl
    }

    return null
  })

  if (stripePaymentLinkUrl === null) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <Box
        component='a'
        href={stripePaymentLinkUrl}
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          fontSize: '12px',
          color: 'text.secondary',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {stripePaymentLinkUrl}
      </Box>
      <Tooltip title='Copy link'>
        <IconButton
          size='small'
          onClick={async () => {
            await globalThis.navigator.clipboard
              .writeText(stripePaymentLinkUrl ?? '')
              .then(() => toast.success('Link copied'))
              .catch(() => toast.error('Failed to copy'))
          }}
        >
          <MdContentCopy style={{ fontSize: '16px' }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
