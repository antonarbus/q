import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const BoqTableLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      className='boq-table-container-with-paddings'
      style={{
        // to have a gap when overflow
        padding: '10px 10px 2px 10px',
      }}
    >
      <Box
        className='boq-table-container'
        style={{
          padding: '5px',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
