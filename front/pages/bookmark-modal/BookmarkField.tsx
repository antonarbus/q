import { dispatch, useSelector } from '@shared/lib/redux'
import { AnimatePresence } from 'motion/react'
import { useEffectOnce } from 'react-use'
import { Block } from '@widgets/block/Block'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'
import { textSlice } from '@shared/lib/froala/textSlice'

export const BookmarkField = (): React.ReactNode => {
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
        <Block
          block={bookmarkBlock}
          blockIndex={BOOKMARK_POS_AT_BLOCKS}
        />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}
