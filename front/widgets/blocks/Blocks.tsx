import { AnimatePresence } from 'framer-motion'
import {
  bookmarkPosAtBlocks,
  type Block as BlockType,
} from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'

// todo: go through commits and find when pdf got broken

type Props = {
  blocks: (BlockType | null)[]
}

export const Blocks = ({ blocks }: Props): React.ReactNode => {
  if (blocks.length === 0) return null

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
