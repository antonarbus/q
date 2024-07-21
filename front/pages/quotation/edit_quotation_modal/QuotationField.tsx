import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { Blocks } from '@widgets/blocks'
import { type Block, isFroalaSignal } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'

type Props = {
  blocks: Block[]
}

const QuotationFieldLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  return (
    <OutlinedDivWithLabel label='Quotation'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
          margin: '10px',
          padding: '10px',
          '.actions-container': {
            display: 'none !important',
          },
        }}
      >
        <Box
          sx={{
            width: '2000px',
          }}
        >
          {children}
        </Box>
      </Box>
    </OutlinedDivWithLabel>
  )
}

export const QuotationField = ({ blocks }: Props): ReactNode => {
  return (
    <QuotationFieldLayout>
      <Blocks blocks={blocks} />
    </QuotationFieldLayout>
  )
}
