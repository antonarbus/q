import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqHeaderKey } from '../../types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey

}

export const getBoqHeaderHtmlFromStore = ({ itemIndex, boqHeaderKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== itemType.boq) return ''
  return item.boq.header[boqHeaderKey].html
}
