import { columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const ItemPriceColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.itemPrice}
      className={`th ${boqColumnKey.itemPrice} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Box style={columnHeaderStyle}>Price</Box>
    </ResizableColumn>
  )
}
