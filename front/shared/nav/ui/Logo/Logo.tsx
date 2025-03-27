import { Box } from '@mui/material'
import logoSrc from './logo.png'

type Prop = {
  logoRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const Logo = ({ logoRef }: Prop): React.JSX.Element => {
  return (
    <div
      className='logo-container'
      ref={logoRef}
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
