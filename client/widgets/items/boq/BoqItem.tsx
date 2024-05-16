import { BookmarkItemIcon } from '@features/items/bookmark'
import { CopyItemIcon } from '@features/items/copy'
import { CutItemIcon } from '@features/items/cut'
import { DeleteItemIcon } from '@features/items/delete'
import { DragItemIcon } from '@features/items/drag'
import { OpenInfoItemModalIcon } from '@features/items/open/open_info_item_modal'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize'
import { ItemComp } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqItem = (): JSX.Element => {
  return (
    <ItemComp
      className='boq-item'
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
          <BookmarkItemIcon />
          <OpenInfoItemModalIcon />
          <DeleteItemIcon />
        </ItemActionButtonsLayout>
      )}
    >
      <BoqHeader />
      <BoqTable />
    </ItemComp>
  )
}
