import type { RootState } from '@shared/lib/redux'
import { itemType } from '../../consts/itemType'

export const selectIsLastBlock = (state: RootState): boolean =>
  state.quotation.blocks.filter((block) => block.type !== itemType.paste)
    .length === 1
