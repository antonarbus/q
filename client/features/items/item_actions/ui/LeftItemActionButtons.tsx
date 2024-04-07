import { CopyItemIcon } from '../copy_item'
import { CutItemIcon } from '../cut_item'
import { DragItemIcon } from '../drag_item'
import { ItemActionButtonsLayout } from './ItemActionButtonsLayout'

export const LeftItemActionButtons = (): JSX.Element => {
  return (
    <ItemActionButtonsLayout>
      <DragItemIcon />
      <CopyItemIcon />
      <CutItemIcon />
    </ItemActionButtonsLayout>
  )
}
