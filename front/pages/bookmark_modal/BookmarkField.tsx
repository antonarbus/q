import { useSelector } from '@shared/lib/redux'
import { AnimatePresence } from 'framer-motion'
import { useEffectOnce } from 'react-use'
import { Block } from '@widgets/blocks/Block'
import { bookmarkPosAtBlocks, isFroalaSignal } from '@entities/quotation'
import { arrayShapesEqualityFn } from '@shared/utils/arrayShapesEqualityFn'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): React.ReactNode => {
  const blocks = useSelector(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
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
