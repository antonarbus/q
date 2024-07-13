import { type RootState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

export const selectIsLastBlock = (state: RootState): boolean =>
  state.quotation.blocks.filter((block) => block.type !== itemKey.paste)
    .length === 1
