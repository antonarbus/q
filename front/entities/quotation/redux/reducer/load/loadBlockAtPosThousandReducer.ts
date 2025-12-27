import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BlockItem } from '@root/shared/types/BlockItem'
import type { Quotation } from '@root/shared/types/Quotation'

type Payload = {
  block: BlockItem
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  state.blocks[BOOKMARK_POS_AT_BLOCKS] = clonedBlock
}
