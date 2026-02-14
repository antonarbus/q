import { CopyRowIcon } from '@feature/blocks/copy'
import { CutRowIcon } from '@feature/blocks/cut'
import { DeleteRowIcon } from '@feature/blocks/delete'
import { DragRowIcon } from '@feature/blocks/drag'
import { BookmarkRowIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoRowModalIcon } from '@feature/open-close/open-info-modal'
import { DescriptionCell } from './cell/DescriptionCell'
import { ItemPriceCell } from './cell/ItemPriceCell'
import { NumberCell } from './cell/NumberCell'
import { PriceCell } from './cell/PriceCell'
import { QtyCell } from './cell/QtyCell'
import { RowActionButtonsLayout } from './RowActionButtonsLayout'
import { RowLayout } from './RowLayout'

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
