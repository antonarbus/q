import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const PriceColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.price}
    >
      <Box style={columnHeaderStyle}>
        <b>Price</b>
      </Box>
    </ResizableColumn>
  )
}
