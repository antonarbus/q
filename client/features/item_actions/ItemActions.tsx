import { CopyItemIcon } from './copy_item'
import { CutItemIcon } from './cut_item'
import { DeleteItemIcon } from './delete_item'
import { DragItemIcon } from './drag_item'

type Props = {
  itemIndex: number
}

export const ItemActions = ({ itemIndex }: Props): JSX.Element => {
  return (
    <>
      <DragItemIcon />
      <CopyItemIcon itemIndex={itemIndex} />
      <CutItemIcon itemIndex={itemIndex} />
      <DeleteItemIcon itemIndex={itemIndex} />
    </>
  )
}
