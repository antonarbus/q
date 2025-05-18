import {
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const DescriptionColumn = (): React.ReactNode => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.description}
      className={`th ${boqColumnKey.description} resizable`}
      flexGrow={1}
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
