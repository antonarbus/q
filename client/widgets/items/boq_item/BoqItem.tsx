import { onBoqItemResizeStart, onBoqItemResizeStop } from 'client/features/resize_item'
import { Header } from './Header'
import { BoqTable } from './Table/BoqTable'
import { Item } from 'client/entities/items'
import { DragItemIcon } from 'client/features/item_actions/drag_item'
import { CopyItemIcon } from 'client/features/item_actions/copy_item'
import { CutItemIcon } from 'client/features/item_actions/cut_item'
import { DeleteItemIcon } from 'client/features/item_actions/delete_item'
import { ItemActions } from 'client/features/item_actions'

type Props = {
  itemIndex: number
}

export const BoqItem = ({ itemIndex }: Props): JSX.Element => {
  return (
    <Item
      itemIndex={itemIndex}
      autoWidth={true}
      onItemResizeStop={onBoqItemResizeStop}
      onItemResizeStart={onBoqItemResizeStart}
      itemActions={<ItemActions itemIndex={itemIndex} />}
    >
      <Header itemIndex={itemIndex} />
      <BoqTable itemIndex={itemIndex} />
    </Item>
  )
}
