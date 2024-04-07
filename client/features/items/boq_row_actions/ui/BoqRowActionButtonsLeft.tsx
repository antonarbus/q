import { CopyBoqRowIcon } from '../copy_boq_row'
import { CutBoqRowIcon } from '../cut_boq_row'
import { DeleteBoqRowIcon } from '../delete_boq_row'
import { DragBoqRow } from '../drag_boq_row'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'

export const BoqRowActionButtonsLeft = (): JSX.Element => {
  return (
    <BoqRowActionButtonsLayout
      style={{ left: '-33px' }}
    >
      <DragBoqRow />
      <CopyBoqRowIcon />
      <CutBoqRowIcon />
    </BoqRowActionButtonsLayout>
  )
}
