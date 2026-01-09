import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import type { BlockItem } from '@back/entity/quotation/schema'
import { OpenInsertMenuButton } from '@feature/open-close/open-insert-menu'
import { AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'

type Props = {
  blocks: (BlockItem | null)[]
}

export const BlockMany = (props: Props): ReactNode => {
  if (props.blocks.length === 0) {
    return null
  }

  // clean blocks from a bookmark at blocks[1000] which we use to show in in modal view
  const blocksCloned = structuredClone(props.blocks)

  blocksCloned[BOOKMARK_POS_AT_BLOCKS] = null

  return (
    <BlocksSortableContext>
      <FadeInOnInitLoad>
        <AnimatePresence initial={false}>
          {blocksCloned
            .filter((block) => block !== null)
            .map((block, bockIndex) => (
              <Block block={block} blockIndex={bockIndex} key={block.id} />
            ))}
          <OpenInsertMenuButton />
        </AnimatePresence>
      </FadeInOnInitLoad>
    </BlocksSortableContext>
  )
}
