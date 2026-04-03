import type { RootState } from '@front/shared/lib/redux/reduxHolder'

export const selectIsLastBlock = (state: RootState): boolean => state.quotation.blocks.length === 1
