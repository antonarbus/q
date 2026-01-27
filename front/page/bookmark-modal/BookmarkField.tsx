import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { Block } from '@widget/block/Block'
import { AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): ReactNode => {
  const blocks = useSelector((state) => state.quotation.blocks)

  useEffectOnce(() => {
    dispatch(textSlice.actions.setEditable())
  })

  const bookmarkBlock = blocks.at(BOOKMARK_POS_AT_BLOCKS)

  if (bookmarkBlock === undefined) {
    return null
  }

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <Block block={bookmarkBlock} blockIndex={BOOKMARK_POS_AT_BLOCKS} />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}
