import type { Quotation } from '../../types'

type Reducer = (state: Quotation) => void

export const removeBookmarkReducer: Reducer = (state) => {
  //@ts-expect-error: it is a hack
  state.blocks[1000] = null
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const blocksWithoutBookmark = state.blocks.filter((block) => block !== null)
  state.blocks = blocksWithoutBookmark
}
