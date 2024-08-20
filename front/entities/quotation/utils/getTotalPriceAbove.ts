import { itemType } from '../consts/itemType'
import type { Boq, Item } from '../types'

type Props = {
  blockIndex: number
  blocks: Item[]
}

export const getTotalPriceAbove = ({ blockIndex, blocks }: Props): number => {
  let totalPriceAbove = 0

  for (let i = blockIndex - 1; i >= 0; i--) {
    if (blockIndex === 0) break

    const isPriceItem = blocks.at(i)?.type === itemType.price

    if (isPriceItem) break

    const isBoqItem = blocks.at(i)?.type === itemType.boq

    if (isBoqItem) {
      const boqItem = blocks.at(i) as Boq
      const subTotalPrice = boqItem.boq.header.subTotalPrice.value
      totalPriceAbove += subTotalPrice
    }
  }

  return totalPriceAbove
}
