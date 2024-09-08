import { Box } from '@mui/material'
import { OutlinedDivWithLabel } from '@shared/components/OutlinedDivWithLabel'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
}

export const BookmarkFieldLayout = ({ children }: Props): JSX.Element => {
  return (
    <OutlinedDivWithLabel label='Item'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
          margin: '10px',
          padding: '10px',
          [`.${cls.blocks}`]: {
            maxWidth: 'none !important',
            padding: '10px !important',
            [`:has(.${cls.priceBlock})`]: {
              display: 'block !important',
            },
            [`:has(.${cls.textBlock})`]: {
              display: 'block !important',
            },
          },
          [`.${cls.block}`]: {
            marginBottom: '0px !important',
          },
          [`.${cls.block}.${cls.priceBlock}`]: {
            display: 'block !important',
          },
          [`.${cls.block}.${cls.textBlock}`]: {
            display: 'block !important',
          },
          [`.${cls.block}.${cls.boqBlock}`]: {
            justifyContent: 'flex-start !important',
          },
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
