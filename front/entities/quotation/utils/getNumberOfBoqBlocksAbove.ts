import { getState } from '@shared/lib/redux'
import { itemType } from '../consts/itemType'

type Props = {
  blockIndex: number
}

export const getNumberOfBoqBlocksAbove = ({ blockIndex }: Props): number => {
  const numberOfBoqBlocksAbove = getState().quotation.blocks.reduce(
    (accumulator, block, index) => {
      const isNotLastBoq = block.type === itemType.boq && index < blockIndex

      if (isNotLastBoq === true) {
        return accumulator + 1
      }

      return accumulator
    },
    0,
  )

  return numberOfBoqBlocksAbove
}
