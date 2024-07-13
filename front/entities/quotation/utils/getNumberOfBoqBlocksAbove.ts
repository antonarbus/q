import { getState } from '@lib_instances/store'
import { itemKey } from '../consts/itemKey'

type Props = {
  itemIndex: number
}

export const getNumberOfBoqBlocksAbove = ({ itemIndex }: Props): number => {
  const numberOfBoqBlocksAbove = getState().quotation.blocks.reduce(
    (accumulator, item, index) => {
      if (item.type === itemKey.boq && index < itemIndex) {
        return accumulator + 1
      }

      return accumulator
    },
    0,
  )

  return numberOfBoqBlocksAbove
}
