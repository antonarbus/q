import { getState } from '@shared/clients'
import type { BoqHeaderKey } from '@shared/types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey

}

export const getBoqHeaderHtmlFromStore = ({ itemIndex, boqHeaderKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  return item.boq.header[boqHeaderKey].html
}
