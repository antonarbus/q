import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { type BoqHeaderKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  boqHeaderKey: BoqHeaderKey

}

export const updateBoqHeader = ({ html, itemIndex, boqHeaderKey }: Props): void => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return
  const prevHtml = item.boq.header[boqHeaderKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return
  dispatch(itemsSlice.actions.updateBoqHeaderText({ itemIndex, html, boqHeaderKey }))
  saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
}
