import { getState } from '@libras/store'

type Props = {
  itemIndex: number
}

export const getNumberOfBoqItemsAbove = ({ itemIndex }: Props): number => {
  const numberOfBoqItemsAbove = getState().items.reduce((accumulator, item, index) => {
    if (item.type === 'boq' && index < itemIndex) {
      return accumulator + 1
    }

    return accumulator
  }, 0)

  return numberOfBoqItemsAbove
}
