import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <Box sx={columnHeaderStyle}>
        <b>Qty</b>
      </Box>
    </ResizableColumn>
  )
}
