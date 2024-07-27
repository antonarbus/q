import { columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { ResizableColumn } from '../ResizableColumn'
import { Box } from '@mui/material'

export const PriceColumn = (): JSX.Element => {
  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Box style={columnHeaderStyle}>
        <b>Price</b>
      </Box>
    </ResizableColumn>
  )
}
