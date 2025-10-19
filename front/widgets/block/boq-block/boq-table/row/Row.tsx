import { CopyRowIcon } from '@features/blocks/copy'
import { CutRowIcon } from '@features/blocks/cut'
import { DeleteRowIcon } from '@features/blocks/delete'
import { DragRowIcon } from '@features/blocks/drag'
import { BookmarkRowIcon } from '@features/open-close/open-bookmark-modal'
import { OpenInfoRowModalIcon } from '@features/open-close/open-info-modal'
import type { FocusEvent, JSX } from 'react'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'
import { RowActionButtonsLayout } from './RowActionButtonsLayout'
import { RowLayout } from './RowLayout'

type Props = {
  onBlur: (e: FocusEvent<HTMLDivElement>) => void
}

export const Row = ({ onBlur }: Props): JSX.Element => {
  return (
    <RowLayout onBlur={onBlur}>
      <RowActionButtonsLayout style={{ left: '-33px' }}>
        <DragRowIcon />
        <CopyRowIcon />
        <CutRowIcon />
      </RowActionButtonsLayout>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
      <RowActionButtonsLayout style={{ right: '-33px' }}>
        <BookmarkRowIcon />
        <OpenInfoRowModalIcon />
        <DeleteRowIcon />
      </RowActionButtonsLayout>
    </RowLayout>
  )
}
