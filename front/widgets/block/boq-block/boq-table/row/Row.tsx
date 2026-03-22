import { BookmarkRowIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoRowModalIcon } from '@front/features/open-close/open-info-modal'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'
import { RowActionButtonsLayout } from './RowActionButtonsLayout'
import { RowLayout } from './RowLayout'
import { CopyRowIcon } from '@front/features/blocks/copy-item/CopyRowIcon'
import { CutRowIcon } from '@front/features/blocks/cut-item/CutRowIcon'
import { DeleteRowIcon } from '@front/features/blocks/delete-item/DeleteRowIcon'
import { DragRowIcon } from '@front/features/blocks/drag-item/DragRowIcon'

type Props = {
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

export const Row = (props: Props): React.JSX.Element => {
  return (
    <RowLayout onBlur={props.onBlur}>
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
