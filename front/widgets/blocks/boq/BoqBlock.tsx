import { CopyBlockIcon } from '@features/items/copy'
import { CutBlockIcon } from '@features/items/cut'
import { DeleteBlockIcon } from '@features/items/delete'
import { DragBlockIcon } from '@features/items/drag'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/items/resize'
import { BookmarkBlockIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoBlockModalIcon } from '@features/open_close/open_item_info_modal'
import { BoqItemProvider, BlockComp } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqBlock = (): JSX.Element => {
  return (
    <BoqItemProvider>
      <BlockComp
        className='boq-item'
        autoWidth={true}
        minWidth='560px'
        onItemResizeStart={onBoqBlockResizeStart}
        onItemResize={onBoqBlockResize}
        onItemResizeStop={onBoqBlockResizeStop}
        leftItemActionButtons={
          <ItemActionButtonsLayout>
            <DragBlockIcon />
            <CopyBlockIcon />
            <CutBlockIcon />
          </ItemActionButtonsLayout>
        }
        rightItemActionButtons={
          <ItemActionButtonsLayout>
            <BookmarkBlockIcon />
            <OpenInfoBlockModalIcon />
            <DeleteBlockIcon />
          </ItemActionButtonsLayout>
        }
      >
        <BoqHeader />
        <BoqTable />
      </BlockComp>
    </BoqItemProvider>
  )
}
