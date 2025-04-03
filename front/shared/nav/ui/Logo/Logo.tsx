import { Box } from '@mui/material'
import logoSrc from './logo.png'

export const Logo = (): React.JSX.Element => {
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
          className='logo-image'
          src={logoSrc}
          alt='logo'
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
