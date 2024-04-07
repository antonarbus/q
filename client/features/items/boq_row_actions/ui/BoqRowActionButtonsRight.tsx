import { AddBoqRowIcon } from '../add_boq_row'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'

export const BoqRowActionButtonsRight = (): JSX.Element => {
  return (
    <BoqRowActionButtonsLayout
      style={{ right: '-33px' }}
    >
      <AddBoqRowIcon />
    </BoqRowActionButtonsLayout>
  )
}
