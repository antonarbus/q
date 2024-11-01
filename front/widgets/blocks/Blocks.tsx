import { AnimatePresence } from 'framer-motion'
import { bookmarkPosAtBlocks, type Item } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'

type Props = {
  blocks: (Item | null)[]
}

export const Blocks = ({ blocks }: Props): React.ReactNode => {
  if (blocks.length === 0) return null

  // clean blocks from a bookmark at blocks[1000] which we use to show in in modal view
  const blocksCloned = structuredClone(blocks)
  blocksCloned[bookmarkPosAtBlocks] = null

  return (
    <FadeInOnInitLoad>
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {blocksCloned
            .filter((block) => block !== null)
            .map((block, bockIndex) => (
              <Block
                key={block.id}
                block={block}
                blockIndex={bockIndex}
              />
            ))}
        </AnimatePresence>
      </BlocksSortableContext>
    </FadeInOnInitLoad>
  )
}
