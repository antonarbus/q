import { Box } from '@mui/material'
import { useRow } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { PasteBoqRowTextOverlay } from './paste_here_row'

type Props = {
  children: React.ReactNode
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

export const BoqRowLayout = ({
  children,
  onBlur,
}: Props): React.JSX.Element => {
  const { row } = useRow()

  return (
    <Box
      id={row.id}
      className={cls.boqRow}
      onBlur={(event) => {
        onBlur(event)
      }}
      style={{
        // https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height
        // background: 'red',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <PasteBoqRowTextOverlay>{children}</PasteBoqRowTextOverlay>
    </Box>
  )
}
