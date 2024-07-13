import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { Blocks } from '@widgets/items'
import { type Item, isFroalaSignal } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'

type Props = {
  items: Item[]
}

export const QuotationField = ({ items }: Props): ReactNode => {
  return (
    <QuotationFieldLayout>
      <Blocks items={items} />
    </QuotationFieldLayout>
  )
}

function QuotationFieldLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
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
