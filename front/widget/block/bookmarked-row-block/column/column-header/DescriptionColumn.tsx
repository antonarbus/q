import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const DescriptionColumn = (): ReactNode => {
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
