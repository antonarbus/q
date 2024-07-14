import { getState } from '@lib_instances/store'
import { itemKey } from '../consts/itemKey'

type Props = {
  blockIndex: number
}

export const getNumberOfBoqBlocksAbove = ({ blockIndex }: Props): number => {
  const numberOfBoqBlocksAbove = getState().quotation.blocks.reduce(
    (accumulator, item, index) => {
      if (item.type === itemKey.boq && index < blockIndex) {
        return accumulator + 1
      }

      return accumulator
    },
    0,
  )

  return numberOfBoqBlocksAbove
}
