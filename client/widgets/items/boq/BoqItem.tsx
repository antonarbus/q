import { CopyItemIcon } from '@features/items/copy_item'
import { CutItemIcon } from '@features/items/cut_item'
import { DeleteItemIcon } from '@features/items/delete_item'
import { DragItemIcon } from '@features/items/drag_item'
import { InfoItemIcon } from '@features/items/open_info_item_modal'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize_item'
import { SaveItemIcon } from '@features/items/save_item'
import { ItemComp } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layouts'
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
      leftItemActionButtons={(
        <ItemActionButtonsLayout>
          <DragItemIcon />
          <CopyItemIcon />
          <CutItemIcon />
        </ItemActionButtonsLayout>
      )}
      rightItemActionButtons={(
        <ItemActionButtonsLayout>
          <SaveItemIcon />
          <InfoItemIcon />
          <DeleteItemIcon />
        </ItemActionButtonsLayout>
      )}
    >
      <BoqHeader />
      <BoqTable />
    </ItemComp>
  )
}
