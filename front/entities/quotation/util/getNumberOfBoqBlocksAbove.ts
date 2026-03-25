import { reduxHolder } from '@front/shared/lib/redux'

type Props = {
  blockIndex: number
}

export const getNumberOfBoqBlocksAbove = (props: Props): number => {
  const numberOfBoqBlocksAbove = reduxHolder
    .getState()
    .quotation.blocks.reduce((accumulator, block, index) => {
      const isNotLastBoq = block.type === 'boq' && index < props.blockIndex

      if (isNotLastBoq === true) {
        return accumulator + 1
      }

      return accumulator
    }, 0)

  return numberOfBoqBlocksAbove
}
