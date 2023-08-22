export const selectIsItemAlone = (state: RootState): boolean =>
  state.items.filter((item) => item.type !== 'paste').length === 1
