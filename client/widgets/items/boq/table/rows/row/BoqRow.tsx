import { BoqRowActions } from 'client/features/boq_row_actions'
import { NumberCell } from './cells/NumberCell'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemPriceCell } from './cells/ItemPriceCell'
import { QtyCell } from './cells/QtyCell'
import { PriceCell } from './cells/PriceCell'
import { BoqRowLayout } from './BoqRowLayout'
import { type FocusEvent } from 'react'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement, Element>) => void
}

export const BoqRow = ({ onBlur }: Props): JSX.Element => {
  return (
    <BoqRowLayout
      onBlur={onBlur}
    >
      <BoqRowActions />
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
    </BoqRowLayout>
  )
}
