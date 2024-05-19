import { CopyItemIcon } from '@features/items/copy'
import { CutItemIcon } from '@features/items/cut'
import { DeleteItemIcon } from '@features/items/delete'
import { DragItemIcon } from '@features/items/drag'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/items/resize'
import { BookmarkItemIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoItemModalIcon } from '@features/open_close/open_item_info_modal'
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
