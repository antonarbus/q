import type { RootState } from 'client/shared/types'

type Props = {
  itemIndex: number
}

export const selectReRenderTotalPrice = ({ itemIndex }: Props) => (state: RootState): boolean => {
  const item = state.items[itemIndex]

  if (item?.type !== 'boq') return false

  const reRender = item.boq.header.price.reRender
  return reRender
}
