import { Box } from '@mui/material'
import type { ComponentRef, JSX, ReactNode, RefObject } from 'react'

type Props = {
  children: ReactNode
  gridContainerRef: RefObject<ComponentRef<'div'> | null>
}

export const GridLayout = (props: Props): JSX.Element => {
  return (
    <Box
      className='q-table'
      ref={props.gridContainerRef}
      sx={{
        flexGrow: 1,
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        mt: '10px',
      }}
    >
      {props.children}
    </Box>
  )
}
