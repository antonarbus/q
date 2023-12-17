import type { BoqRow as BoqRowType } from 'client/shared/types'
import { BoqRowActions } from 'client/features/boq_row_actions'
import { NumberCell } from './cells/NumberCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemCell } from './cells/ItemCell'
import { QtyCell } from './cells/QtyCell'
import { PriceCell } from './cells/PriceCell'
import { BoqRowLayout } from './BoqRowLayout'

type Props = {
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({
  boqRow,
  rowIndex,
}: Props): JSX.Element => {
  return (
    <BoqRowLayout id={boqRow.id}>
      <BoqRowActions rowIndex={rowIndex} boqRow={boqRow} />
      <NumberCell rowIndex={rowIndex} />
      <DescriptionCell rowIndex={rowIndex} />
      <ItemCell rowIndex={rowIndex} />
      <QtyCell rowIndex={rowIndex} />
      <PriceCell rowIndex={rowIndex} />
    </BoqRowLayout>
  )
}
