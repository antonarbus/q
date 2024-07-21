import { cls } from '@shared/consts/cls'
import { PriceHeader } from './price_header/PriceHeader'
import { PriceMain } from './price_main/PriceMain'
import { BookmarkComp } from '@entities/quotation/ui/BookmarkComp'
import { BlockProvider, itemType } from '@entities/quotation'
import { bookmarkSignal } from '@entities/bookmark'
import type { ReactNode } from 'react'
import { onPriceBlockBookmarkResizeStop } from '@features/blocks/resize/onPriceBlockBookmarkResize'

export const PriceBlockBookmark = (): ReactNode => {
  if (bookmarkSignal.value === null) return null
  if (bookmarkSignal.value.type !== itemType.price) return null

  return (
    <BlockProvider
      id={'price block for bookmark'}
      blockIndex={0}
      block={bookmarkSignal.value}
    >
      <BookmarkComp
        className={cls.priceBlock}
        onBlockResizeStop={onPriceBlockBookmarkResizeStop}
      >
        <PriceHeader />
        <PriceMain />
      </BookmarkComp>
    </BlockProvider>
  )
}
