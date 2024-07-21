import type { ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { isFroalaSignal } from '@entities/quotation'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'
import { PriceBlockBookmark } from '@widgets/bookmarks/price_block_bookmark/PriceBlockBookmark'
import { TextBlockBookmark } from '@widgets/bookmarks/text_block_bookmark'
import { BoqBlockBookmark } from '@widgets/bookmarks/boq_block_bookmark'

export const BookmarkField = (): ReactNode => {
  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  return (
    <BookmarkFieldLayout>
      <TextBlockBookmark />
      <PriceBlockBookmark />
      <BoqBlockBookmark />
    </BookmarkFieldLayout>
  )
}
