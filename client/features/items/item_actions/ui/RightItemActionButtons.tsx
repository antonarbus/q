import { DeleteItemIcon } from '../delete_item'
import { InfoItemIcon } from '../info_item'
import { SaveItemIcon } from '../save_item'
import { ItemActionButtonsLayout } from './ItemActionButtonsLayout'

export const RightItemActionButtons = (): JSX.Element => {
  return (
    <ItemActionButtonsLayout>
      <SaveItemIcon />
      <InfoItemIcon />
      <DeleteItemIcon />
    </ItemActionButtonsLayout>
  )
}
