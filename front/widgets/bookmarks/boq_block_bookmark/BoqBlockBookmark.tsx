import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { BoqItemProvider, itemType, BlockProvider } from '@entities/quotation'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'
import { bookmarkSignal } from '@entities/bookmark'
import type { ReactNode } from 'react'
import { BookmarkComp } from '@entities/quotation/ui/BookmarkComp'

export const BoqBlockBookmark = (): ReactNode => {
  if (bookmarkSignal.value === null) return null
  if (bookmarkSignal.value.type !== itemType.boq) return null

  return (
    <BlockProvider
      id={'boq block for bookmark'}
      blockIndex={0}
      block={bookmarkSignal.value}
    >
      <BoqItemProvider>
        <BookmarkComp
          autoWidth={true}
          minWidth='560px'
          onBlockResizeStart={onBoqBlockResizeStart}
          onBlockResize={onBoqBlockResize}
          onBlockResizeStop={onBoqBlockResizeStop}
        >
          <BoqHeader />
          <BoqTable />
        </BookmarkComp>
      </BoqItemProvider>
    </BlockProvider>
  )
}
