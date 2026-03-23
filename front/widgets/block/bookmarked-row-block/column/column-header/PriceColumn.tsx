import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import { ResizableColumn } from '../ResizableColumn'

export const PriceColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='price'
      className='th price resizable'
      minWidth={columnMinWidth.price}
    >
      <Box sx={columnHeaderStyle}>
        <b>Price</b>
      </Box>
    </ResizableColumn>
  )
}
