import { getState } from '@lib_instances/store'
import { itemType } from '../consts/itemType'

type Props = {
  blockIndex: number
}

export const getNumberOfBoqBlocksAbove = ({ blockIndex }: Props): number => {
  const numberOfBoqBlocksAbove = getState().quotation.blocks.reduce(
    (accumulator, item, index) => {
      if (item.type === itemType.boq && index < blockIndex) {
        return accumulator + 1
      }

      return accumulator
    },
    0,
  )

  return numberOfBoqBlocksAbove
}
