import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import { useEffectOnce } from 'react-use'
import { Block } from '@widgets/blocks/Block'
import { bookmarkPosAtBlocks, isFroalaSignal } from '@entities/quotation'
import { arrayShapesEqualityFn } from '@shared/lib/redux/arrayShapesEqualityFn'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): React.ReactNode => {
  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  const bookmarkBlock = blocks.at(bookmarkPosAtBlocks)

  if (!bookmarkBlock) return null

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
