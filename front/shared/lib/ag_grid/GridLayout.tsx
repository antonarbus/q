import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  gridContainerRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const GridLayout = ({
  children,
  gridContainerRef,
}: Props): React.JSX.Element => {
  return (
    <Box
      className='q-table'
      ref={gridContainerRef}
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
