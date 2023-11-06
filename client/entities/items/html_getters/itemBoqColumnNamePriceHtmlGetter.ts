import { getState } from 'client/shared/clients'
import type { HtmlGetter } from 'client/shared/types'

export const itemBoqColumnNamePriceHtmlGetter: HtmlGetter = ({ itemIndex, rowIndex }) => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  return item.boq.column.price.html
}
