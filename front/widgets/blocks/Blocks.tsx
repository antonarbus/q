import { AnimatePresence } from 'framer-motion'
import type { Block as BlockType } from '@entities/quotation'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'

type Props = {
  blocks: BlockType[]
}

export const Blocks = ({ blocks }: Props): React.ReactNode => {
  if (blocks.length === 0) return null

  return (
    <FadeInOnInitLoad>
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {blocks.map((block, bockIndex) => (
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
