import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { JSX } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const NumberColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.number}
      className={`th ${boqColumnKey.number} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.number}
    >
      <Box style={columnHeaderStyle} />
    </ResizableColumn>
  )
}
