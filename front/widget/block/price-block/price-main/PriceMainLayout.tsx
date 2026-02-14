import { Box } from '@mui/material'

type Props = {
  main: React.JSX.Element
}

export const PriceMainLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      className='layout price-value'
      style={{
        padding: '10px 15px',
        minHeight: '40px',
      }}
    >
      {props.main}
    </Box>
  )
}
