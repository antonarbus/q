import { Box } from '@mui/material'
import { useEffectOnce } from 'react-use'
import { Blocks } from '@widgets/blocks'
import { isFroalaSignal } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components'
import { getState } from '@lib_instances/store'

type Props = {
  children: React.ReactNode
}

const QuotationFieldLayout = ({ children }: Props): JSX.Element => {
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

export const QuotationField = (): React.ReactNode => {
  const blocks = getState().quotation.blocks

  return (
    <QuotationFieldLayout>
      <Blocks blocks={blocks} />
    </QuotationFieldLayout>
  )
}
