import { getBoqItemFromStore, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { getNumberFromString, getTextContentFromHtml, saveItemsLocally } from 'client/shared/lib'
import { type BoqHeaderKey } from 'client/shared/types'

type Props = {
  html: string
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const updateBoqHeaderCellAtStore = ({
  html,
  itemIndex,
  boqHeaderKey,
}: Props): void => {
  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return

  const prevHtml = boqItem.boq.header[boqHeaderKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(itemsSlice.actions.updateBoqHeaderTextReducer({
    itemIndex,
    html,
    value: cellValueFromHtml,
    boqHeaderKey,
  }))

  saveItemsLocally({
    msgAboveItemWithIndex: itemIndex,
  })
}
