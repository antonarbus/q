import { type RootState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

export const selectIsLastItem = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== itemKey.paste).length === 1
