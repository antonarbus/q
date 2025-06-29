import { type SxProps, Typography, Box } from '@mui/material'

type Props = {
  children?: React.ReactNode
  sx?: SxProps
  reference?: React.RefObject<React.ComponentRef<'div'> | null>
  title?: React.ReactNode
  logo?: React.ReactNode
}

export const CardCustom = ({
  children,
  sx,
  reference,
  title,
  logo,
}: Props): React.JSX.Element => (
  <Box
    onMouseDown={(event: React.MouseEvent): void => {
      event.stopPropagation()
    }}
    ref={reference}
    sx={{
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
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...sx,
    }}
  >
    {Boolean(logo) && <div style={{ alignSelf: 'center' }}>{logo}</div>}
    {Boolean(title) && (
      <Typography
        component='h1'
        sx={{ alignSelf: 'center', marginBottom: '30px' }}
        variant='h6'
      >
        {title}
      </Typography>
    )}
    {children}
  </Box>
)
