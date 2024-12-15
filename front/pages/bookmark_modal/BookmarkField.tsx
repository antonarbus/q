import { dispatch, useSelector } from '@shared/lib/redux'
import { AnimatePresence } from 'motion/react'
import { useEffectOnce } from 'react-use'
import { Block } from '@widgets/blocks/Block'
import { bookmarkPosAtBlocks } from '@entities/quotation'
import { arrayShapesEqualityFn } from '@shared/utils/arrayShapesEqualityFn'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'
import { textSlice } from '@shared/lib/froala/textSlice'

export const BookmarkField = (): React.ReactNode => {
  const blocks = useSelector(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  useEffectOnce(() => {
    dispatch(textSlice.actions.setEditable())
  })

  const bookmarkBlock = blocks.at(bookmarkPosAtBlocks)

  if (!bookmarkBlock) {
    return null
  }

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <Block
          block={bookmarkBlock}
          blockIndex={bookmarkPosAtBlocks}
        />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}
