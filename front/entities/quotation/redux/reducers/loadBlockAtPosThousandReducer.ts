import type { PayloadAction } from '@reduxjs/toolkit'
import type { Block, Quotation } from '../../types'
import { bookmarkPosAtBlocks } from '@entities/quotation/consts/bookmarkPosAtBlocks'

type Payload = {
  block: Block
}

type Reducer = (state: Quotation, action: PayloadAction<Payload>) => void

export const loadBlockAtPosThousandReducer: Reducer = (state, action) => {
  const { block } = action.payload
  const clonedBlock = structuredClone(block)
  state.blocks[bookmarkPosAtBlocks] = clonedBlock
}
