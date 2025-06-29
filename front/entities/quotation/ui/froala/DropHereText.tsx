import { Box } from '@mui/material'
import { cls } from '@shared/const/cls'

export const DropHereText = (): React.JSX.Element => {
  return (
    <Box
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        top: '2px',
        right: '5px',
        color: 'grey',
        fontSize: '12px',
        fontWeight: 700,
        userSelect: 'none',
        display: 'none',
      }}
    >
      Drop here
    </Box>
  )
}
