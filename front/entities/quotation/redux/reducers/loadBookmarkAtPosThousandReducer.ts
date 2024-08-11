import type { PayloadAction } from '@reduxjs/toolkit'
import type { Block, Quotation } from '../../types'

type Payload = {
  block: Block
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBookmarkAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  state.blocks[1000] = clonedBlock
}
