import type { FocusEvent } from 'react'
import { CopyBoqRowIcon } from '@features/blocks/copy'
import { CutBoqRowIcon } from '@features/blocks/cut'
import { DeleteBoqRowIcon } from '@features/blocks/delete'
import { DragBoqRowIcon } from '@features/blocks/drag'
import { BookmarkBoqRowIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBoqRowModalIcon } from '@features/open_close/open_info_modal'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'
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
      <BoqRowActionButtonsLayout style={{ left: '-33px' }}>
        <DragBoqRowIcon />
        <CopyBoqRowIcon />
        <CutBoqRowIcon />
      </BoqRowActionButtonsLayout>
      <NumberCell />
      <DescriptionCell />
      <ItemPriceCell />
      <QtyCell />
      <PriceCell />
      <BoqRowActionButtonsLayout style={{ right: '-33px' }}>
        <BookmarkBoqRowIcon />
        <OpenInfoBoqRowModalIcon />
        <DeleteBoqRowIcon />
      </BoqRowActionButtonsLayout>
    </BoqRowLayout>
  )
}
