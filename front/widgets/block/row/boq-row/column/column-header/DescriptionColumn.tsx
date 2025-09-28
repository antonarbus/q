import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'

export const DescriptionColumn = (): ReactNode => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      minWidth={columnMinWidth.description}
    >
      <Box
        style={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      >
        <b>Description</b>
      </Box>
    </ResizableColumn>
  )
}
