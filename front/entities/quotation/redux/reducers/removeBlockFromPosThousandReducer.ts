import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/consts/bookmarkPosAtBlocks'
import type { Quotation } from '../../types'

type Reducer = (state: Quotation) => void

export const removeBlockFromPosThousandReducer: Reducer = (state) => {
  // @ts-expect-error: it is a hack
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = null
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const blocksWithoutBookmark = state.blocks.filter((block) => block !== null)
  state.blocks = blocksWithoutBookmark
}
