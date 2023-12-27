import { BoqRowActions } from 'client/features/boq_row_actions'
import { NumberCell } from './cells/NumberCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemCell } from './cells/ItemCell'
import { QtyCell } from './cells/QtyCell'
import { PriceCell } from './cells/PriceCell'
import { BoqRowLayout } from './BoqRowLayout'

export const BoqRow = (): JSX.Element => {
  return (
    <BoqRowLayout>
      <BoqRowActions />
      <NumberCell />
      <DescriptionCell />
      <ItemCell />
      <QtyCell />
      <PriceCell />
    </BoqRowLayout>
  )
}
