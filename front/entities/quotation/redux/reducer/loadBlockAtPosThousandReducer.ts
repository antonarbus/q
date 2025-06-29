import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item, Quotation } from '../../type'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'

type Payload = {
  block: Item
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = clonedBlock
}
