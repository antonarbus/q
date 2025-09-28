import { CopyBlockIcon } from '@features/blocks/copy'
import { CutBlockIcon } from '@features/blocks/cut'
import { DeleteBlockIcon } from '@features/blocks/delete'
import { DragBlockIcon } from '@features/blocks/drag'
import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { BookmarkBlockIcon } from '@features/open-close/open-bookmark-modal'
import { OpenInfoBlockModalIcon } from '@features/open-close/open-info-modal'
import { BoqProvider, BlockComp } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layout/ItemActionButtonsLayout'
import { BoqHeader } from './boq-header'
import { BoqTable } from './boq-table'
import { cls } from '@shared/const/cls'
import type { JSX } from 'react'

export const BoqBlock = (): JSX.Element => {
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
