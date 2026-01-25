import { Box, type CSSObject, Typography } from '@mui/material'
import type { ComponentRef, JSX, MouseEvent, ReactNode, RefObject } from 'react'

type Props = {
  children?: ReactNode
  sx?: CSSObject
  reference?: RefObject<ComponentRef<'div'> | null>
  title?: ReactNode
  logo?: ReactNode
}

export const CardCustom = (props: Props): JSX.Element => (
  <Box
    onMouseDown={(event: MouseEvent): void => {
      event.stopPropagation()
    }}
    ref={props.reference}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 64px)',
      maxWidth: 'calc(100vw - 64px)',
      minWidth: '300px',
      width: '400px',
      margin: '32px',
      padding: '40px',
      background: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1001,
      color: 'rgba(0, 0, 0, 0.87)',
      borderRadius: '12px',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backdropFilter: 'blur(4px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow:
        '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      overflowY: 'auto',
      '&:hover, &:focus-within': {
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      ...props.sx,
    }}
  >
    {Boolean(props.logo) && (
      <div style={{ alignSelf: 'center' }}>{props.logo}</div>
    )}
    {Boolean(props.title) && (
      <Typography
        component='h1'
        sx={{ alignSelf: 'center', marginBottom: '30px' }}
        variant='h6'
      >
        {props.title}
      </Typography>
    )}
    {props.children}
  </Box>
)
