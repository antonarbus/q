import type { FocusEvent } from 'react'
import { BoqRowLayout } from './BoqRowLayout'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BoqRow = ({ onBlur }: Props): React.JSX.Element => {
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
