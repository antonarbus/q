import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const PriceColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      minWidth={columnMinWidth.price}
    >
      <Box style={columnHeaderStyle}>
        <b>Price</b>
      </Box>
    </ResizableColumn>
  )
}
