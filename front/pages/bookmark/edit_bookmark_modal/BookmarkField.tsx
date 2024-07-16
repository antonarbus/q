import { AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { isFroalaSignal } from '@entities/quotation'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'
import { TextBlockBookmark } from '@widgets/bookmarks/TextBlockBookmark'

export const BookmarkField = (): ReactNode => {
  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <TextBlockBookmark />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}
