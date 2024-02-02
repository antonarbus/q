import { ItemActions } from '@features/item_actions'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/resize_item'
import { Item } from '@entities/items'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <Item
      autoWidth={true}
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      itemActions={<ItemActions />}
    >
      <div>total price</div>
    </Item>
  )
}
