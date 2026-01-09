import type { FocusEvent, JSX } from 'react'
import { BookmarkedRowLayout } from './BookmarkedRowLayout'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const BookmarkedRow = (props: Props): JSX.Element => {
  return (
    <BookmarkedRowLayout onBlur={props.onBlur}>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
    </BookmarkedRowLayout>
  )
}
