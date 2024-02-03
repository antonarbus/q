import { Box } from '@mui/material'

type Props = {
  main: JSX.Element
}

export const PriceMainLayout = ({ main }: Props): JSX.Element => {
  return (
    <Box
      className='boq-table-container-with-paddings'
      sx={{
        p: '10px 10px 2px 10px', // to have a gap when overflow
      }}
    >
      <Box
        className='boq-table-container'
        sx={{
          p: '5px',
          clipPath: 'inset(0 0 0 -100px)',
          '& *': {
            // background: '#ff00001b',
          },
        }}
      >
        {main}
      </Box>
    </Box>
  )
}
