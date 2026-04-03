import { Box } from '@mui/material'
import logoSrc from './logo.png'

export const LogoLink = (): React.JSX.Element => {
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
            userSelect: 'none',
            filter: 'brightness(0.5)',
            position: 'relative',
            top: '5px',
          }}
        />
      </Box>
    </div>
  )
}
