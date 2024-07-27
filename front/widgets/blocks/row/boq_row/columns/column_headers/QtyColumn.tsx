import { columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const QtyColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Box style={columnHeaderStyle}>Qty</Box>
    </ResizableColumn>
  )
}
