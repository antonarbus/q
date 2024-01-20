import { Box } from '@mui/material'
import { columnHeaderStyle } from '@entities/items'
import { type BoqColumnKey } from '@entities/items'
import { ResizableColumn } from '../ResizableColumn'

const boqColumnKey: BoqColumnKey = 'number'

export const NumberColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={30}
      flexGrow={0}
    >
      <Box
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
