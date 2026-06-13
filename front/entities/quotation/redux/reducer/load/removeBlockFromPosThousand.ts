import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import type { Quotation } from '@back/entity/quotation/schema'

type Reducer = (state: Quotation) => void

export const removeBlockFromPosThousand: Reducer = (state) => {
  // @ts-expect-error: it is a hack
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = null
  // oxlint-disable-next-line typescript/no-unnecessary-condition -- runtime value can be `null` due to the hack above, even though the type doesn't reflect it
  const blocksWithoutBookmark = state.blocks.filter((block) => block !== null)
  state.blocks = blocksWithoutBookmark
}
