import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import { ResizableColumn } from '../ResizableColumn'

export const NumberColumn = (): React.JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey='number'
      className='th number resizable'
      minWidth={columnMinWidth.number}
    >
      <Box sx={columnHeaderStyle} />
    </ResizableColumn>
  )
}
