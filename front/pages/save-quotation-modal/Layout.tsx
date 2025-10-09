import { Box } from '@mui/material'
import { OutlinedDivWithLabel } from '@shared/component/OutlinedDivWithLabel'
import { cls } from '@shared/const/cls'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import type { JSX, ReactNode } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => {
  useEffectOnce(() => {
    dispatch(textSlice.actions.setEditable())
  })

  const maxBlockWidth = useSelector((state) => {
    const maxWidth = state.quotation.blocks.reduce((accumulator, block) => {
      if ((block.width ?? 0) > accumulator) {
        return block.width ?? 0
      }

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
