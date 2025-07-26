import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { Quotation } from '../../type'

type Reducer = (state: Quotation) => void

export const removeBlockFromPosThousandReducer: Reducer = (state) => {
  // @ts-expect-error: it is a hack
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = null
  const blocksWithoutBookmark = state.blocks.filter((block) => block !== null)
  state.blocks = blocksWithoutBookmark
}
