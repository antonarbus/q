import type { RootState } from '@shared/lib/redux'

export const selectIsLastBlock = (state: RootState): boolean =>
  state.quotation.blocks.length === 1
