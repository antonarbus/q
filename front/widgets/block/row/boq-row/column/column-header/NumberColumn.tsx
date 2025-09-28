import { Box } from '@mui/material'
import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import type { JSX } from 'react'

export const NumberColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.number}
      className={`th ${boqColumnKey.number} resizable`}
      minWidth={columnMinWidth.number}
    >
      <Box style={columnHeaderStyle} />
    </ResizableColumn>
  )
}
