import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const NumberColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='number'
      className='th number resizable'
      minWidth={columnMinWidth.number}
    >
      <Box sx={columnHeaderStyle} />
    </ResizableColumn>
  )
}
