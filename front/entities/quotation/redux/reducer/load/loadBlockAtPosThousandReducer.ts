import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BlockItem, Quotation } from '../../../type'

type Payload = {
  block: BlockItem
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = clonedBlock
}
