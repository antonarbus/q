import { getState } from '@shared/lib/redux'
import { itemType } from '../const/itemType'

type Props = {
  blockIndex: number
}

export const getNumberOfBoqBlocksAbove = (props: Props): number => {
  const numberOfBoqBlocksAbove = getState().quotation.blocks.reduce(
    (accumulator, block, index) => {
      const isNotLastBoq =
        block.type === itemType.boq && index < props.blockIndex

      if (isNotLastBoq === true) {
        return accumulator + 1
      }

      return accumulator
    },
    0,
  )

  return numberOfBoqBlocksAbove
}
