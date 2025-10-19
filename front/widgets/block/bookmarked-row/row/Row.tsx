import type { FocusEvent, JSX } from 'react'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'
import { RowLayout } from './RowLayout'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const Row = ({ onBlur }: Props): JSX.Element => {
  return (
    <RowLayout onBlur={onBlur}>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
    </RowLayout>
  )
}
