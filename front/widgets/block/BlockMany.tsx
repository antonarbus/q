import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import type { BlockItem } from '@back/entity/quotation/schema'
import { AnimatePresence } from 'motion/react'
import { Block } from './Block'
import { BlocksSortableContext } from './BlocksSortableContext'
import { Box } from '@mui/material'
import { cls } from '@front/shared/cls'

type Props = {
  blocks: (BlockItem | null)[]
}

export const BlockMany = (props: Props): React.ReactNode => {
  if (props.blocks.length === 0) {
    return null
  }

  // Clean blocks from a bookmark at blocks[1000] which we use to show in in modal view
  const blocksCloned = structuredClone(props.blocks)

  blocksCloned[BOOKMARK_POS_AT_BLOCKS] = null

  return (
    <Box
      className={cls.blocks}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '25px 10px 5px 10px',
      }}
    >
      <BlocksSortableContext>
        <AnimatePresence initial={false}>
          {blocksCloned
            .filter((block) => block !== null)
            .map((block, bockIndex) => {
              return <Block block={block} blockIndex={bockIndex} key={block.id} />
            })}
        </AnimatePresence>
      </BlocksSortableContext>
    </Box>
  )
}
