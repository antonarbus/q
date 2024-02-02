import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'

type Props = {
  itemIndex: number
}

export const getItemTextHtmlFromStore = ({ itemIndex }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== itemType.text) return ''
  return item.text.html
}
