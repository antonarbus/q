import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/resize_item'
import { Header } from './header'
import { BoqTable } from './table/BoqTable'
import { Item } from '@entities/items'
import { ItemActions } from '@features/item_actions'

export const BoqItem = (): JSX.Element => {
  return (
    <Item
      autoWidth={true}
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      itemActions={<ItemActions />}
    >
      <Header />
      <BoqTable />
    </Item>
  )
}
