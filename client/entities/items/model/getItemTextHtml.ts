import { store } from 'client/shared/clients'
import type { THtmlGetter } from 'client/shared/types'

export const itemTextHtmlGetter: THtmlGetter = ({ index, rowIndex }) => {
  const item = store.getState().items[index]
  if (!item) return ''
  if (item.type !== 'text') return ''
  return item.text.html
}