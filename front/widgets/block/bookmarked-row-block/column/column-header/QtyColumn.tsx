import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <Box sx={columnHeaderStyle}>
        <b>Qty</b>
      </Box>
    </ResizableColumn>
  )
}
