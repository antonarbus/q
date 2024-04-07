import { DeleteItemIcon } from '../delete_item'
import { SaveItemIcon } from '../save_item'
import { SearchItemIcon } from '../search_item'
import { ItemActionButtonsLayout } from './ItemActionButtonsLayout'

export const RightItemActionButtons = (): JSX.Element => {
  return (
    <ItemActionButtonsLayout>
      <SaveItemIcon />
      <SearchItemIcon />
      <DeleteItemIcon />
    </ItemActionButtonsLayout>
  )
}
