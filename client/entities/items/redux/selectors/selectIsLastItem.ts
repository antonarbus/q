import type { RootState } from '@shared/types'

export const selectIsLastItem = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== 'paste').length === 1
