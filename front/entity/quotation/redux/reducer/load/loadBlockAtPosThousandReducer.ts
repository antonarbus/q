import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BlockItem, Quotation } from '@back/entity/quotation/schema'

type Payload = {
  block: BlockItem
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const clonedBlock = structuredClone(action.payload.block)
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = clonedBlock
}
