import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

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
