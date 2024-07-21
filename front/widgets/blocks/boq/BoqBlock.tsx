import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
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
        autoWidth={true}
        minWidth='560px'
        onBlockResizeStart={onBoqBlockResizeStart}
        onBlockResize={onBoqBlockResize}
        onBlockResizeStop={onBoqBlockResizeStop}
        leftBlockActionButtons={
          <ItemActionButtonsLayout>
            <DragBlockIcon />
            <CopyBlockIcon />
            <CutBlockIcon />
          </ItemActionButtonsLayout>
        }
        rightBlockActionButtons={
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
