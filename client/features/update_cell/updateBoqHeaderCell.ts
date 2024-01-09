import { getBoqItemFromStore, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { type BoqHeaderKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateBoqHeaderCell = ({
  html,
  itemIndex,
  boqHeaderKey,
}: Props): void => {
  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const prevHtml = boqItem.boq.header[boqHeaderKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  dispatch(itemsSlice.actions.updateBoqHeaderTextReducer({ itemIndex, html, boqHeaderKey }))
  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
