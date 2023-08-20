import { store } from 'client/shared/clients'
import type { HtmlGetter } from 'client/shared/types'

export const itemBoqColumnNamePriceHtmlGetter: HtmlGetter = ({ index, rowIndex }) => {
  const item = store.getState().items[index]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  return item.boq.column.price.html
}