import { BoqProvider } from '@entity/quotation/provider/BoqBlockProvider'
import { BlockComp } from '@entity/quotation/ui/BlockComp'
import { CopyBlockIcon } from '@feature/blocks/copy'
import { CutBlockIcon } from '@feature/blocks/cut'
import { DeleteBlockIcon } from '@feature/blocks/delete'
import { DragBlockIcon } from '@feature/blocks/drag'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@feature/blocks/resize'
import { BookmarkBlockIcon } from '@feature/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@feature/open-close/open-info-modal'
import { cls } from '@shared/cls'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { BoqHeader } from './boq-header'
import { BoqTable } from './boq-table'

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
