import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'

type Props = {
  html: string
  itemIndex: number
}

export const changeItemText = ({ html, itemIndex }: Props): void => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'text') return
  const prevHtml = item.text.html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.saveItemText({ itemIndex, html }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
