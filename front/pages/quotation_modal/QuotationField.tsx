import { Box } from '@mui/material'
import { useEffectOnce } from 'react-use'
import { Blocks } from '@widgets/blocks'
import { isFroalaSignal } from '@entities/quotation'
import { OutlinedDivWithLabel } from '@shared/components/OutlinedDivWithLabel'
import { getState, useSelector } from '@shared/lib/redux'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
}

const QuotationFieldLayout = ({ children }: Props): React.JSX.Element => {
  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  const maxBlockWidth = useSelector((state) => {
    const maxWidth = state.quotation.blocks.reduce((accumulator, block) => {
      if ((block.width ?? 0) > accumulator) return block.width ?? 0

      return accumulator
    }, 600)

    return maxWidth
  })

  return (
    <OutlinedDivWithLabel label='Quotation'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
          margin: '10px',
          padding: '10px',
          [`.${cls.actionsContainer}`]: {
            display: 'none !important',
          },
          [`.${cls.blocks}`]: {
            display: 'block !important',
          },
        }}
      >
        <Box
          sx={{
            width: `${maxBlockWidth + 200}px`,
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
