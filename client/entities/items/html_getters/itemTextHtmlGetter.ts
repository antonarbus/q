import { getState } from 'client/shared/clients'
import type { HtmlGetter } from 'client/shared/types'

export const itemTextHtmlGetter: HtmlGetter = ({ itemIndex, rowIndex }) => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'text') return ''
  return item.text.html
}
