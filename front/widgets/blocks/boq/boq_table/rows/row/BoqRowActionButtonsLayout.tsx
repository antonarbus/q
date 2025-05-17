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
        alignContent: 'center',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        justifyContent: 'flex-end',
        position: 'absolute',
        ...props.style,
      }}
      sx={{
        [`.${cls.actionIconContainer}`]: {
          height: '10px',
          lineHeight: '10px',
        },
        [`.${cls.actionIcon}`]: {
          cursor: 'pointer',
          height: '10px',
          outline: 0,
          transition: 'scale 0.2s',
          width: '10px',
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
