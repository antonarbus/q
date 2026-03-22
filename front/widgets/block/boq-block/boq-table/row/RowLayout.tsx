import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { Box } from '@mui/material'
import { cls } from '@front/shared/cls'
import { PasteRowTextOverlay } from './paste-here-row'

type Props = {
  children: React.ReactNode
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

export const RowLayout = (props: Props): React.JSX.Element => {
  const row = useRow()

  return (
    <Box
      className={cls.row}
      id={row.item.id}
      onBlur={(event) => {
        props.onBlur(event)
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
      <PasteRowTextOverlay>{props.children}</PasteRowTextOverlay>
    </Box>
  )
}
