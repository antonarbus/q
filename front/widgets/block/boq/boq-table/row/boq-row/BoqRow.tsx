import type { FocusEvent } from 'react'
import { CopyBoqRowIcon } from '@features/blocks/copy'
import { CutBoqRowIcon } from '@features/blocks/cut'
import { DeleteBoqRowIcon } from '@features/blocks/delete'
import { DragBoqRowIcon } from '@features/blocks/drag'
import { BookmarkBoqRowIcon } from '@features/open-close/open-bookmark-modal'
import { OpenInfoBoqRowModalIcon } from '@features/open-close/open-info-modal'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'
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
