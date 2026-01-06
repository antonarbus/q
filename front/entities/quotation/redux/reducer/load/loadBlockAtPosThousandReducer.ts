import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BlockItem, Quotation } from '@back/entities/quotation/schemas'

type Payload = {
  block: BlockItem
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const clonedBlock = structuredClone(action.payload.block)
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = clonedBlock
}
