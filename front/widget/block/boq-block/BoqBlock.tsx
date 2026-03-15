import { BoqProvider } from '@entity/quotation/provider/BoqBlockProvider'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { BoqHeader } from './boq-header'
import { BoqTable } from './boq-table'
import { CopyBlockIcon } from '@feature/blocks/copy-block/CopyBlockIcon'
import { CutBlockIcon } from '@feature/blocks/cut-block/CutBlockIcon'
import { DeleteBlockIcon } from '@feature/blocks/delete-block/DeleteBlockIcon'
import { DragBlockIcon } from '@feature/blocks/drag-block/DragBlockIcon'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@feature/blocks/resize-boq-block/onBoqBlockResize'

export const BoqBlock = (): React.JSX.Element => {
  return (
    <BoqProvider>
      <BlockComp
        autoWidth
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
    </BoqProvider>
  )
}
