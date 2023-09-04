import { Box } from '@mui/material'
import type { BoqRow as BoqRowType } from 'client/shared/types'
import { IconsCell } from './IconsCell'
import { NumberCell } from './NumberCell'
import { DescriptionCell } from './DescriptionCell'
import { ItemCell } from './ItemCell'
import { QtyCell } from './QtyCell'
import { PriceCell } from './PriceCell'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, index, rowIndex }: Props): JSX.Element => {
  return (
    <Box
      className='tr'
      sx={{
        display: 'flex',
        minHeight: '50px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      <IconsCell />
      <NumberCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <DescriptionCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <ItemCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <QtyCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <PriceCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
    </Box>
  )
}
