import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const ItemPriceColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.itemPrice}
      className={`th ${boqColumnKey.itemPrice} resizable`}
      minWidth={columnMinWidth.itemPrice}
    >
      <Box style={columnHeaderStyle}>
        <b>Item price</b>
      </Box>
    </ResizableColumn>
  )
}
