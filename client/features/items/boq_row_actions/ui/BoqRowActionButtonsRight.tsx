import { DeleteBoqRowIcon } from '../delete_boq_row'
import { SaveBoqRowIcon } from '../save_boq_row'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'

export const BoqRowActionButtonsRight = (): JSX.Element => {
  return (
    <BoqRowActionButtonsLayout
      style={{ right: '-33px' }}
    >
      <SaveBoqRowIcon />
      <DeleteBoqRowIcon />
    </BoqRowActionButtonsLayout>
  )
}
