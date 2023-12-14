import type { BoqRow as BoqRowType } from 'client/shared/types'
import { BoqRowActions } from 'client/features/boq_row_actions'
import { NumberCell } from './cells/NumberCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemCell } from './cells/ItemCell'
import { QtyCell } from './cells/QtyCell'
import { PriceCell } from './cells/PriceCell'
import { BoqRowLayout } from './BoqRowLayout'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({
  boqRow,
  itemIndex,
  rowIndex,
  boqEditorsRef,
}: Props): JSX.Element => {
  return (
    <BoqRowLayout id={boqRow.id}>
      <BoqRowActions itemIndex={itemIndex} rowIndex={rowIndex} boqRow={boqRow} />
      <NumberCell itemIndex={itemIndex} rowIndex={rowIndex} />
      <DescriptionCell itemIndex={itemIndex} rowIndex={rowIndex} />
      <ItemCell itemIndex={itemIndex} rowIndex={rowIndex} />
      <QtyCell itemIndex={itemIndex} rowIndex={rowIndex} />
      <PriceCell
        itemIndex={itemIndex}
        rowIndex={rowIndex}
        boqEditorsRef={boqEditorsRef}
      />
    </BoqRowLayout>
  )
}
