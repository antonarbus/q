import { getState } from 'client/shared/clients'
import type { HtmlGetter } from 'client/shared/types'

export const itemBoqHeaderCurrencyHtmlGetter: HtmlGetter = ({ index, rowIndex }) => {
  const item = getState().items[index]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  return item.boq.header.currency.html
}