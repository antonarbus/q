import { type RootState } from '@lib_instances/store'

export const selectIsLastItem = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== 'paste').length === 1
