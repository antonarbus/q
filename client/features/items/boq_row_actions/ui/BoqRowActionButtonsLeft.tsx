import { CopyBoqRowIcon } from '../copy_boq_row'
import { CutBoqRowIcon } from '../cut_boq_row'
import { DragBoqRowIcon } from '../drag_boq_row'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'

export const BoqRowActionButtonsLeft = (): JSX.Element => {
  return (
    <BoqRowActionButtonsLayout
      style={{ left: '-33px' }}
    >
      <DragBoqRowIcon />
      <CopyBoqRowIcon />
      <CutBoqRowIcon />
    </BoqRowActionButtonsLayout>
  )
}
