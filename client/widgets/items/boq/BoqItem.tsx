import { LeftItemActionButtons, RightItemActionButtons } from '@features/items/item_actions'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize_item'
import { ItemComp } from '@entities/quotation'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqItem = (): JSX.Element => {
  return (
    <ItemComp
      autoWidth={true}
      minWidth='560px'
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      leftItemActionButtons={<LeftItemActionButtons />}
      rightItemActionButtons={<RightItemActionButtons />}
    >
      <BoqHeader />
      <BoqTable />
    </ItemComp>
  )
}
