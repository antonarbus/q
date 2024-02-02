import { type RootState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'

export const selectIsLastItem = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== itemType.paste).length === 1
