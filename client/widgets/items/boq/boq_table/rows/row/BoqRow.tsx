import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type FocusEvent } from 'react'
import { CopyBoqRowIcon } from '@features/items/copy'
import { CutBoqRowIcon } from '@features/items/cut'
import { DeleteBoqRowIcon } from '@features/items/delete'
import { DragBoqRowIcon } from '@features/items/drag'
import { BookmarkBoqRowIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBoqRowModalIcon } from '@features/open_close/open_item_info_modal'
import { useRow } from '@entities/quotation'
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
  const { rowId } = useRow()
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: rowId,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : 0,
      }}
    >
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
    </div>
  )
}
