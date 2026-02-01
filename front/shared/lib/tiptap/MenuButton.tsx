import { Box } from '@mui/material'
import type { JSX, ReactNode } from 'react'

type Props = {
  onClick: () => void
  isActive: boolean
  title: string
  children: ReactNode
}

export const MenuButton = (props: Props): JSX.Element => (
  <Box
    component='button'
    type='button'
    onClick={props.onClick}
    title={props.title}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '28px',
      height: '28px',
      padding: '4px 8px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: 14,
      backgroundColor: props.isActive === true ? '#dcdcdc' : 'transparent',
      ':hover': {
        backgroundColor: props.isActive === true ? '#dcdcdc' : '#eaeaea',
      },
    }}
  >
    {props.children}
  </Box>
)
