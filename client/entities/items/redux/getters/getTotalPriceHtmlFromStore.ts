import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'

type Props = {
  itemIndex: number

}

export const getTotalPriceHtmlFromStore = ({ itemIndex }: Props): string => {
  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemType.price) return ''
  const html = priceItem.price.html
  return html
}
