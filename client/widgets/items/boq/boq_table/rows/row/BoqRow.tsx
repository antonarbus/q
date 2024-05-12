import { type FocusEvent } from 'react'
import { CopyBoqRowIcon } from '@features/items/copy_boq_row'
import { CutBoqRowIcon } from '@features/items/cut_boq_row'
import { DeleteBoqRowIcon } from '@features/items/delete_boq_row'
import { DragBoqRowIcon } from '@features/items/drag_boq_row'
import { OpenInfoBoqRowModalIcon } from '@features/items/open_info_boq_row_modal'
import { SaveBoqRowIcon } from '@features/items/save_boq_row'
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
        <SaveBoqRowIcon />
        <OpenInfoBoqRowModalIcon />
        <DeleteBoqRowIcon />
      </BoqRowActionButtonsLayout>
    </BoqRowLayout>
  )
}
