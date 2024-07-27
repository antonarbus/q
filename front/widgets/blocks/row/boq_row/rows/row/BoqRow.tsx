import type { FocusEvent } from 'react'
import { BoqRowLayout } from './BoqRowLayout'
import { DescriptionCell } from './cells/DescriptionCell'
import { ItemPriceCell } from './cells/ItemPriceCell'
import { NumberCell } from './cells/NumberCell'
import { PriceCell } from './cells/PriceCell'
import { QtyCell } from './cells/QtyCell'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRow = ({ onBlur }: Props): JSX.Element => {
  return (
    <BoqRowLayout onBlur={onBlur}>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
    </BoqRowLayout>
  )
}
