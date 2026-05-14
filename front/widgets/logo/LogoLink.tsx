import { Box } from '@mui/material'
import logoSrc from './logo.png'
import { Link } from 'react-router-dom'
import { openQuotationPageAndLoadNew } from '@front/features/open-close/open-quotation-page'
import type { ReactNode } from 'react'

export const LogoLink = (): ReactNode => {
  return (
    <Link
      to='/new'
      onClick={(event) => {
        event.preventDefault()
        openQuotationPageAndLoadNew()
      }}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: '3px 10px',
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
    </Link>
  )
}
