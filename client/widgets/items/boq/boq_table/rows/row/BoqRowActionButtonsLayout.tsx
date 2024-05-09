import { Box } from '@mui/material'
import { className } from '@shared/consts/className'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const BoqRowActionButtonsLayout = (props: Props): JSX.Element => {
  return (
    <Box
      className={className.actionsContainer}
      style={{
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'center',
        gap: '2px',
        ...props.style,
      }}
      sx={{
        '& > *': {
          height: '10px',
          width: '10px',
          transition: 'scale 0.2s',
          cursor: 'pointer',
          outline: 0,
        },
        '& > *:hover': {
          scale: '1.5',
        },
      }}
    >
      {props.children}
    </Box>
  )
}
