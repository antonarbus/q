import { getState } from '@lib_instances/store'
import { itemType } from '../consts/itemType'

type Props = {
  itemIndex: number
}

export const getNumberOfBoqItemsAbove = ({ itemIndex }: Props): number => {
  const numberOfBoqItemsAbove = getState().items.reduce((accumulator, item, index) => {
    if (item.type === itemType.boq && index < itemIndex) {
      return accumulator + 1
    }

    return accumulator
  }, 0)

  return numberOfBoqItemsAbove
}
