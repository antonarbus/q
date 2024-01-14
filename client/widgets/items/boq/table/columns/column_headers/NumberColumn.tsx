import { ResizableColumn } from '../ResizableColumn'
import { columnHeaderStyle } from 'client/entities/items'
import { type BoqColumnKey } from 'client/shared/types'
import { Box } from '@mui/material'

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
