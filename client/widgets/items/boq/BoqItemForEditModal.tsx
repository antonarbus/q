import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize_item'
import { ItemComp } from '@entities/quotation'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqItemForEditModal = (): JSX.Element => {
  return (
    <ItemComp
      autoWidth={true}
      minWidth='560px'
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <BoqHeader />
      <BoqTable />
    </ItemComp>
  )
}
