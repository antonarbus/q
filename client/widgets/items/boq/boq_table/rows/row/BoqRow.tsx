import { type FocusEvent } from 'react'
import { BookmarkBoqRowIcon } from '@features/items/bookmark'
import { CopyBoqRowIcon } from '@features/items/copy'
import { CutBoqRowIcon } from '@features/items/cut'
import { DeleteBoqRowIcon } from '@features/items/delete'
import { DragBoqRowIcon } from '@features/items/drag'
import { OpenInfoBoqRowModalIcon } from '@features/items/open/open_info_item_modal'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'
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
      <BoqRowActionButtonsLayout style={{ left: '-33px' }} >
        <DragBoqRowIcon />
        <CopyBoqRowIcon />
        <CutBoqRowIcon />
      </BoqRowActionButtonsLayout>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
      <BoqRowActionButtonsLayout style={{ right: '-33px' }} >
        <BookmarkBoqRowIcon />
        <OpenInfoBoqRowModalIcon />
        <DeleteBoqRowIcon />
      </BoqRowActionButtonsLayout>
    </BoqRowLayout>
  )
}
