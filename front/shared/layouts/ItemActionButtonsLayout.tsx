import { Box } from '@mui/material'
import { cls } from '../consts/cls'

type Props = {
  children?: React.ReactNode
}

export const ItemActionButtonsLayout = ({
  children,
}: Props): React.JSX.Element => (
  <Box
    className={cls.actionsContainer}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      alignItems: 'center',
      width: '20px',
      minWidth: '20px',
      userSelect: 'none',
    }}
    sx={{
      [`.${cls.actionIconContainer}`]: {
        height: '12px',
        lineHeight: '12px',
      },
      [`.${cls.actionIcon}`]: {
        height: '12px',
        width: '12px',
        transition: 'scale 0.2s',
        cursor: 'pointer',
        outline: 0,
      },
      [`.${cls.actionIcon}:hover`]: {
        scale: '1.5',
      },
    }}
  >
    {children}
  </Box>
)
