import { Box } from '@mui/material'
import { cls } from '@front/shared/cls'
import { OutlinedDivWithLabel } from '@front/shared/component/outlined-div-with-label/OutlinedDivWithLabel'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  children: React.ReactNode
}

export const Layout = (props: Props): React.JSX.Element => {
  const maxBlockWidth = reduxHolder.useSelector((state) => {
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
          {props.children}
        </Box>
      </Box>
    </OutlinedDivWithLabel>
  )
}
