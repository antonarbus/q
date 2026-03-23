import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import type { BlockItem } from '@back/entity/quotation/schema'
import { OpenInsertMenuButton } from '@front/features/open-close/open-insert-menu'
import { AnimatePresence } from 'motion/react'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'
import { FadeInOnInitLoad } from './FadeInOnInitLoad'

type Props = {
  blocks: (BlockItem | null)[]
}

export const BlockMany = (props: Props): React.ReactNode => {
  if (props.blocks.length === 0) {
    return null
  }

  // clean blocks from a bookmark at blocks[1000] which we use to show in in modal view
  const blocksCloned = structuredClone(props.blocks)

  blocksCloned[BOOKMARK_POS_AT_BLOCKS] = null

  return (
    <FadeInOnInitLoad>
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {blocksCloned
            .filter((block) => block !== null)
            .map((block, bockIndex) => {
              return (
                <Block block={block} blockIndex={bockIndex} key={block.id} />
              )
            })}
          <OpenInsertMenuButton />
        </AnimatePresence>
      </BlocksSortableContext>
    </FadeInOnInitLoad>
  )
}
