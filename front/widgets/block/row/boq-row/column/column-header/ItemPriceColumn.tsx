import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

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
