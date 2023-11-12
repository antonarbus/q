import { getState } from 'client/shared/clients'

type Props = {
  itemIndex: number
}

export const itemTextHtmlGetter = ({ itemIndex }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'text') return ''
  return item.text.html
}
