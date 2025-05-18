import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const QtyColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.qty}
    >
      <Box style={columnHeaderStyle}>
        <b>Qty</b>
      </Box>
    </ResizableColumn>
  )
}
