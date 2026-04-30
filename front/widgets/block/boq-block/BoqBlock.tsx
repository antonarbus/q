import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { BookmarkBlockIcon } from '@front/features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@front/features/open-close/open-info-modal'
import { cls } from '@front/shared/cls'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'
import { BoqHeader } from './boq-header'
import { BoqTable } from './boq-table'
import { CopyBlockIcon } from '@front/features/blocks/copy-item/CopyBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@front/features/blocks/resize-boq-block/onBoqBlockResize'

export const BoqBlock = (): React.JSX.Element => {
  return (
    <BlockComp
      autoWidth={true}
      className={cls.boqBlock}
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CopyBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      minWidth={560}
      onBlockResize={onBoqBlockResize}
      onBlockResizeStart={onBoqBlockResizeStart}
      onBlockResizeStop={onBoqBlockResizeStop}
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
  )
}
