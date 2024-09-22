import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const BoqTableLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <Box
      className='boq-table-container-with-paddings'
      style={{
        padding: '10px 10px 2px 10px', // to have a gap when overflow
      }}
    >
      <Box
        className='boq-table-container'
        style={{
          // todo: think about logic to enable overflow when width of content goes over the screen
          // todo: we may put actions inside and enable overflow: auto
          // overflow: 'auto',
          padding: '5px',
          // clipPath: 'inset(0 0 0 -100px)',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
