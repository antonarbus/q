import { Box } from '@mui/material'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const BoqRowActionButtonsLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      className={cls.actionsContainer}
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
        [`.${cls.actionIconContainer}`]: {
          height: '10px',
          lineHeight: '10px',
        },
        [`.${cls.actionIcon}`]: {
          height: '10px',
          width: '10px',
          transition: 'scale 0.2s',
          cursor: 'pointer',
          outline: 0,
        },
        [`.${cls.actionIcon}:hover`]: {
          scale: '1.5',
        },
      }}
    >
      {props.children}
    </Box>
  )
}
