import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { BoqColumnKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const changeBoqColumn = ({ html, itemIndex, boqColumnKey }: Props): void => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.column[boqColumnKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.updateBoqColumnNameText({ itemIndex, html, boqColumnKey }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
