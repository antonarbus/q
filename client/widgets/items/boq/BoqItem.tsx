import { ItemActions } from '@features/items/item_actions'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize_item'
import { Item } from '@entities/items'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqItem = (): JSX.Element => {
  return (
    <Item
      autoWidth={true}
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      itemActions={<ItemActions />}
    >
      <BoqHeader />
      <BoqTable />
    </Item>
  )
}
