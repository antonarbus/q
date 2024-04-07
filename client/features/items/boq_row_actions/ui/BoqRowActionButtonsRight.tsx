import { AddBoqRowIcon } from '../add_boq_row'
import { SearchBoqRowIcon } from '../search_boq_row copy'
import { BoqRowActionButtonsLayout } from './BoqRowActionButtonsLayout'

export const BoqRowActionButtonsRight = (): JSX.Element => {
  return (
    <BoqRowActionButtonsLayout
      style={{ right: '-33px' }}
    >
      <AddBoqRowIcon />
      <SearchBoqRowIcon />
    </BoqRowActionButtonsLayout>
  )
}
