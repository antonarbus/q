import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import type { Quotation } from '@back/entity/quotation/schema'

type Reducer = (state: Quotation) => void

export const removeBlockFromPosThousand: Reducer = (state) => {
  // @ts-expect-error: it is a hack
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = null
  const blocksWithoutBookmark = state.blocks.filter((block) => block !== null)
  state.blocks = blocksWithoutBookmark
}
