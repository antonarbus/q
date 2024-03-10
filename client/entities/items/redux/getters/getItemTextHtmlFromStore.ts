import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  itemIndex: number
}

export const getItemTextHtmlFromStore = ({ itemIndex }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== itemKey.text) return ''
  return item.text.html
}
