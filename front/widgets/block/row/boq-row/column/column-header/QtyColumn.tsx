import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      minWidth={columnMinWidth.qty}
    >
      <Box style={columnHeaderStyle}>
        <b>Qty</b>
      </Box>
    </ResizableColumn>
  )
}
