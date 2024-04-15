import { getState } from '@lib_instances/store'
import { itemKey } from '../consts/itemKey'

type Props = {
  itemIndex: number
}

export const getNumberOfBoqItemsAbove = ({ itemIndex }: Props): number => {
  const numberOfBoqItemsAbove = getState().quotation.items.reduce((accumulator, item, index) => {
    if (item.type === itemKey.boq && index < itemIndex) {
      return accumulator + 1
    }

    return accumulator
  }, 0)

  return numberOfBoqItemsAbove
}
