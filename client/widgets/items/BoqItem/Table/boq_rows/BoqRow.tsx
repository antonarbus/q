import type { BoqRow as BoqRowType } from 'client/shared/types'
import { IconsCell } from './boq_cells/IconsCell'
import { NumberCell } from './boq_cells/NumberCell'
import { DescriptionCell } from './boq_cells/DescriptionCell'
import { ItemCell } from './boq_cells/ItemCell'
import { QtyCell } from './boq_cells/QtyCell'
import { PriceCell } from './boq_cells/PriceCell'
import { BoqRowLayout } from 'client/shared/layouts'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, index, rowIndex }: Props): JSX.Element => {
  return (
    <BoqRowLayout>
      <IconsCell index={index} rowIndex={rowIndex} boqRow={boqRow} />
      <NumberCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <DescriptionCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <ItemCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <QtyCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
      <PriceCell index={index} boqRow={boqRow} rowIndex={rowIndex} />
    </BoqRowLayout>
  )
}
