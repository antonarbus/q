import { Box } from '@mui/material'
import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'

export const NumberColumn = (): React.JSX.Element => {
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
