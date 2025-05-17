import type { PayloadAction } from '@reduxjs/toolkit'
import type { Quotation } from '../../types'

export const enableFroalaReducer = (
  state: Quotation,
  action: PayloadAction<
    | {
        blockIndex: number
      }
    | undefined
  >,
): void => {
  const { blockIndex } = action.payload ?? {}
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
  quotation.isFroala = true

  quotation.blocks.forEach((block) => {
    block.isFroala = true
  })
}
