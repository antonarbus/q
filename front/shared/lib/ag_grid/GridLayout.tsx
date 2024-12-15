import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  gridContainerRef: React.RefObject<React.ElementRef<'div'>>
}

export const GridLayout = ({
  children,
  gridContainerRef,
}: Props): React.JSX.Element => {
  return (
    <Box
      ref={gridContainerRef}
      className='q-table'
      sx={{
        flexGrow: 1,
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        mt: '10px',
      }}
    >
      {children}
    </Box>
  )
}
