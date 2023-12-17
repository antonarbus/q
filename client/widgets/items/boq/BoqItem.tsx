import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from 'client/features/resize_item'
import { Header } from './header'
import { BoqTable } from './table/BoqTable'
import { Item } from 'client/entities/items'
import { ItemActions } from 'client/features/item_actions'

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
