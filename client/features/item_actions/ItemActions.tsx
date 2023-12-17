import { CopyItemIcon } from './copy_item'
import { CutItemIcon } from './cut_item'
import { DeleteItemIcon } from './delete_item'
import { DragItemIcon } from './drag_item'

export const ItemActions = (): JSX.Element => {
  return (
    <>
      <DragItemIcon />
      <CopyItemIcon />
      <CutItemIcon />
      <DeleteItemIcon />
    </>
  )
}
