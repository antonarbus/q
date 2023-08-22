import { getState } from 'client/shared/clients'
import type { HtmlGetter } from 'client/shared/types'

export const itemTextHtmlGetter: HtmlGetter = ({ index, rowIndex }) => {
  const item = getState().items[index]
  if (!item) return ''
  if (item.type !== 'text') return ''
  return item.text.html
}