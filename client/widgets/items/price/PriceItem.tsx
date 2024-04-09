import { LeftItemActionButtons, RightItemActionButtons } from '@features/items/item_actions'
import { onPriceItemResizeStop } from '@features/items/resize_item'
import { Item } from '@entities/quotation'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'

export const TotalPriceItem = (): JSX.Element => {
  return (
    <Item
      onItemResizeStop={onPriceItemResizeStop}
      leftItemActionButtons={<LeftItemActionButtons />}
      rightItemActionButtons={<RightItemActionButtons />}
    >
      <PriceHeader />
      <PriceMain />
    </Item>
  )
}
