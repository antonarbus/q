import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  itemIndex: number

}

export const getTotalPriceHtmlFromStore = ({ itemIndex }: Props): string => {
  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemKey.price) return ''
  const html = priceItem.price.html
  return html
}
