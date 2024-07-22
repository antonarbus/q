import { useSelectorTyped } from '@lib_instances/store'
import { AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { Block } from '@widgets/blocks/Block'
import { isFroalaSignal } from '@entities/quotation'
import { arrayShapesEqualityFn } from '@shared/lib/redux/arrayShapesEqualityFn'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): ReactNode => {
  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  useEffectOnce(() => {
    isFroalaSignal.value = true
  })

  if (blocks.length === 0) return null

  const firstBlock = blocks[0]

  if (firstBlock === undefined) return null

  return (
    <BookmarkFieldLayout>
      <AnimatePresence initial={false}>
        <Block
          block={firstBlock}
          blockIndex={0}
        />
      </AnimatePresence>
    </BookmarkFieldLayout>
  )
}
