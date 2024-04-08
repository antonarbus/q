import { type FocusEvent } from 'react'
import { BoqRowActionButtonsLeft, BoqRowActionButtonsRight } from '@features/items/boq_row_actions'
import { BoqRowLayout } from './BoqRowLayout'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemPriceCell } from './cells/ItemPriceCell'
import { NumberCell } from './cells/NumberCell'
import { PriceCell } from './cells/PriceCell'
import { QtyCell } from './cells/QtyCell'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement, Element>) => void
}

export const BoqRow = ({ onBlur }: Props): JSX.Element => {
  return (
    <BoqRowLayout onBlur={onBlur}>
      <BoqRowActionButtonsLeft />
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
      <BoqRowActionButtonsRight />
    </BoqRowLayout>
  )
}
