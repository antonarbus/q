import { itemKey } from '../consts/itemKey'
import { type BoqBlock, type Item } from '../types'

type Props = {
  itemIndex: number
  items: Item[]
}

export const getTotalPriceAbove = ({ itemIndex, items }: Props): number => {
  let totalPriceAbove = 0

  for (let i = itemIndex - 1; i >= 0; i--) {
    if (itemIndex === 0) break

    const isPriceItem = items.at(i)?.type === itemKey.price

    if (isPriceItem) break

    const isBoqItem = items.at(i)?.type === itemKey.boq

    if (isBoqItem) {
      const boqItem = items.at(i) as BoqBlock
      const subTotalPrice = boqItem.boq.header.subTotalPrice.value
      totalPriceAbove = totalPriceAbove + subTotalPrice
    }
  }

  return totalPriceAbove
}
