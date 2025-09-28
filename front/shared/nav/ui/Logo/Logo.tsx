import { Box } from '@mui/material'
import logoSrc from './logo.png'
import type { JSX } from 'react'

export const Logo = (): JSX.Element => {
  return (
    <div
      className='logo-container'
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: '3px 10px',
        overflow: 'auto',
      }}
    >
      <Box className='logo'>
        <img
          alt='logo'
          className='logo-image'
          src={logoSrc}
          style={{
            height: 'auto',
            width: '140px',
            minWidth: '140px',
            opacity: 0.7,
            userSelect: 'none',
          }}
        />
      </Box>
    </div>
  )
}
