import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import { ResizableColumn } from '../ResizableColumn'

export const DescriptionColumn = (): React.ReactNode => {
  return (
    <ResizableColumn
      boqColumnKey='description'
      className='th description resizable'
      minWidth={columnMinWidth.description}
    >
      <Box
        sx={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      >
        <b>Description</b>
      </Box>
    </ResizableColumn>
  )
}
