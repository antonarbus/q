import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { ResizableColumn } from '../ResizableColumn'

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
