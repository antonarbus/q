import { Typography } from '@mui/material'
import type { MouseEvent, ReactNode, RefObject } from 'react'

type Props = {
  children?: ReactNode
  sx?: React.CSSProperties
  reference?: RefObject<HTMLDivElement>
  title?: React.ReactNode
  logo?: React.ReactNode
}

export const CardCustom = ({ children, sx, reference, title, logo }: Props): JSX.Element => (
  <div
    ref={reference}
    onMouseDown={(e: MouseEvent): void => {
      e.stopPropagation()
    }}
    css={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 64px)',
      maxWidth: 'calc(100vw - 64px)',
      minWidth: '300px',
      width: '400px',
      margin: '32px',
      padding: '40px',
      background: 'white',
      zIndex: 1001,
      color: 'rgba(0, 0, 0, 0.87)',
      borderRadius: '4px',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      boxShadow:
        '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
      overflowY: 'auto',
      '&:hover, &:focus-within': {
        boxShadow:
          '0px 11px 15px -7px rgb(0 0 0 / 40%), 0px 24px 38px 3px rgb(0 0 0 / 28%), 0px 9px 46px 8px rgb(0 0 0 / 24%)',
      },
      ...sx,
    }}
  >
    {Boolean(logo) && (
      <div style={{ alignSelf: 'center' }} >
        {logo}
      </div>
    )}
    {Boolean(title) && (
      <Typography
        component='h1'
        variant='h6'
        sx={{ alignSelf: 'center', marginBottom: '30px' }}
      >
        {title}
      </Typography>
    )}
    {children}
  </div>
)
