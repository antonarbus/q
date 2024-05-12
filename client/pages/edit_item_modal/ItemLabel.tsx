import { Box } from '@mui/material'

export const ItemLabel = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0,
        transformOrigin: 'top left',
        translate: '7px -10px',
        scale: '0.75',
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '1.4375em',
        letterSpacing: '0.00938em',
        userSelect: 'none',
        background: 'white',
        paddingInline: '8px',
      }}
    >
      Item
    </Box>
  )
}
