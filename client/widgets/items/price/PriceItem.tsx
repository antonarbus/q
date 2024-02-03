import { ItemActions } from '@features/item_actions'
import { onPriceItemResizeStop } from '@features/resize_item'
import { Item } from '@entities/items'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <Item
      onItemResizeStop={onPriceItemResizeStop}
      itemActions={<ItemActions />}
    >
      <PriceHeader />
      <PriceMain />
    </Item>
  )
}
