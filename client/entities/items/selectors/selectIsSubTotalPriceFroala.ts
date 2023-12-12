import type { RootState } from 'client/shared/types'

type Props = {
  itemIndex: number
}

export const selectIsSubTotalPriceFroala = ({ itemIndex }: Props) => (state: RootState): boolean => {
  const item = state.items[itemIndex]

  if (item?.type !== 'boq') return false

  const isFroala = item.boq.header.price.isFroala
  return isFroala
}
