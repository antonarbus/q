import { CopyItemIcon } from '@features/copy'
import { CutItemIcon } from '@features/cut'
import { DeleteItemIcon } from '@features/delete'
import { DragItemIcon } from '@features/drag'
import { BookmarkItemIcon } from '@features/open_close/open_bookmark_item_modal'
import { OpenInfoItemModalIcon } from '@features/open_close/open_info_modal'
import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from '@features/resize'
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
