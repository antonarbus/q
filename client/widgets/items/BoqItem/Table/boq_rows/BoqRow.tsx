import type { BoqRow as BoqRowType } from 'client/shared/types'
import { BoqRowActionsContainer } from './boq_cells/IconsCell'
import { NumberCell } from './boq_cells/NumberCell'
import { DescriptionCell } from './boq_cells/DescriptionCell'
import { ItemCell } from './boq_cells/ItemCell'
import { QtyCell } from './boq_cells/QtyCell'
import { PriceCell } from './boq_cells/PriceCell'
import { BoqRowLayout } from 'client/shared/layouts'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, itemIndex, rowIndex }: Props): JSX.Element => {
  return (
    <BoqRowLayout id={boqRow.id}>
      <BoqRowActionsContainer itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
      <NumberCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <DescriptionCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <ItemCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <QtyCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <PriceCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
    </BoqRowLayout>
  )
}
