import type { PayloadAction } from '@reduxjs/toolkit'
import type { Block, Quotation } from '../../types'
// import { nanoid } from '@shared/lib/nanoid'

type Payload = {
  block: Block
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBookmarkAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  // clonedBlock.id = nanoid()
  state.blocks[1000] = clonedBlock
}
