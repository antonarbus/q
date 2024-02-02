import { ItemActions } from '@features/item_actions'
import { onPriceItemResizeStop } from '@features/resize_item'
import { Item } from '@entities/items'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <Item
      onItemResizeStop={onPriceItemResizeStop}
      itemActions={<ItemActions />}
    >
      <div>total price</div>
    </Item>
  )
}
