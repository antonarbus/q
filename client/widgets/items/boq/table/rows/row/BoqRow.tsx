import type { BoqRow as BoqRowType } from 'client/shared/types'
import { BoqRowActions } from 'client/features/boq_row_actions'
import { NumberCell } from './cells/NumberCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemCell } from './cells/ItemCell'
import { QtyCell } from './cells/QtyCell'
import { PriceCell } from './cells/PriceCell'
import { BoqRowLayout } from 'client/shared/layouts'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, itemIndex, rowIndex }: Props): JSX.Element => {
  return (
    <BoqRowLayout id={boqRow.id}>
      <BoqRowActions itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
      <NumberCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <DescriptionCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <ItemCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <QtyCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
      <PriceCell itemIndex={itemIndex} boqRow={boqRow} rowIndex={rowIndex} />
    </BoqRowLayout>
  )
}
