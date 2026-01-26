import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): JSX.Element => {
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
