import { getBoqItem, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { BoqColumnKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqColumnCell = ({
  html,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  const boqItem = getBoqItem({ itemIndex })
  if (boqItem === undefined) return

  const prevHtml = boqItem.boq.column[boqColumnKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(itemsSlice.actions.updateBoqColumnNameTextReducer({ itemIndex, html, boqColumnKey }))
  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
