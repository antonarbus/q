import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '@root/shared/types/Quotation'

export const enableFroalaReducer = (
  state: Quotation,
  action: PayloadAction<
    | {
        blockIndex: number
      }
    | undefined
  >,
): void => {
  const blockIndex = action.payload?.blockIndex
  const quotation = state
  const enableSpecificFroalas = blockIndex !== undefined

  if (enableSpecificFroalas === true) {
    const block = quotation.blocks[blockIndex]

    if (block === undefined) {
      return
    }

    block.isFroala = true

    return
  }

  // enable all froalas
  quotation.blocks.forEach((block) => {
    block.isFroala = true
  })
}
