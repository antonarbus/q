import { Box } from '@mui/material'
import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({
  children,
  onBlur,
}: Props): React.JSX.Element => {
  return (
    <Box
      className={cls.boqRow}
      onBlur={(e) => {
        onBlur(e)
      }}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {children}
    </Box>
  )
}
