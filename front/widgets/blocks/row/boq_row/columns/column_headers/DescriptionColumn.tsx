import type { ReactNode } from 'react'
import { columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const DescriptionColumn = (): ReactNode => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      minWidth={200}
      flexGrow={1}
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
