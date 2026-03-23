import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='itemPrice'
      className='th itemPrice resizable'
      minWidth={columnMinWidth.itemPrice}
    >
      <Box sx={columnHeaderStyle}>
        <b>Item price</b>
      </Box>
    </ResizableColumn>
  )
}
