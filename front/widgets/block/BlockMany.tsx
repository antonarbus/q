import { AnimatePresence } from 'motion/react'
import { BOOKMARK_POS_AT_BLOCKS, type Item } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'

type Props = {
  blocks: (Item | null)[]
}

export const BlockMany = ({ blocks }: Props): React.ReactNode => {
  if (blocks.length === 0) {
    return null
  }

  // clean blocks from a bookmark at blocks[1000] which we use to show in in modal view
  const blocksCloned = structuredClone(blocks)

  blocksCloned[BOOKMARK_POS_AT_BLOCKS] = null

  return (
    <FadeInOnInitLoad>
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {blocksCloned
            .filter((block) => block !== null)
            .map((block, bockIndex) => (
              <Block
                block={block}
                blockIndex={bockIndex}
                key={block.id}
              />
            ))}
        </AnimatePresence>
      </BlocksSortableContext>
    </FadeInOnInitLoad>
  )
}
