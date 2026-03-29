import { Box } from '@mui/material'
import { cls } from '@front/shared/cls'

type Props = {
  children: React.ReactNode
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void
}

export const BookmarkedRowLayout = (props: Props): React.JSX.Element => {
  return (
    <Box
      className={cls.row}
      onBlur={(event) => {
        props.onBlur(event)
      }}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {props.children}
    </Box>
  )
}
