import { Box } from '@mui/material'
import { columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'

export const NumberColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.number}
      className={`th ${boqColumnKey.number} resizable`}
      minWidth={30}
      flexGrow={0}
    >
      <Box
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
