import { itemType } from '../const/itemType'
import type { Item } from '../type'

type Props = {
  blockIndex: number
  blocks: Item[]
}

export const getTotalPriceAbove = ({ blockIndex, blocks }: Props): number => {
  let totalPriceAbove = 0

  for (let index = blockIndex - 1; index >= 0; index = index - 1) {
    if (blockIndex === 0) {
      break
    }

    const isPriceItem = blocks.at(index)?.type === itemType.price

    if (isPriceItem === true) {
      break
    }

    const isBoqItem = blocks.at(index)?.type === itemType.boq

    if (isBoqItem === true) {
      const boqItem = blocks.at(index)

      if (boqItem?.type === 'boq') {
        const subTotalPrice = boqItem.boq.header.subTotalPrice.value
        totalPriceAbove += subTotalPrice
      }
    }
  }

  return totalPriceAbove
}
