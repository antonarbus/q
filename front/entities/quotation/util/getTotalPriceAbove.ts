import { itemType } from '../const/itemType'
import type { BlockItem } from '@back/entities/quotation/quotationSchema'

type Props = {
  blockIndex: number
  blocks: BlockItem[]
}

export const getTotalPriceAbove = (props: Props): number => {
  let totalPriceAbove = 0

  for (let index = props.blockIndex - 1; index >= 0; index = index - 1) {
    if (props.blockIndex === 0) {
      break
    }

    const isPriceItem = props.blocks.at(index)?.type === itemType.price

    if (isPriceItem === true) {
      break
    }

    const isBoqItem = props.blocks.at(index)?.type === itemType.boq

    if (isBoqItem === true) {
      const boqItem = props.blocks.at(index)

      if (boqItem?.type === 'boq') {
        const subTotalPrice = boqItem.boq.header.subTotalPrice.value
        totalPriceAbove += subTotalPrice
      }
    }
  }

  return totalPriceAbove
}
