import { getBoqRowFromStore, itemsSlice } from '@entities/items'
import { dispatch } from '@shared/clients'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'
import type { BoqColumnKey } from '@shared/types'

type Props = {
  html: string
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const updateBoqRowCellAtStore = ({
  html,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const prevHtml = boqRow[boqColumnKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(itemsSlice.actions.updateBoqCellReducer({
    itemIndex,
    rowIndex,
    html,
    value: cellValueFromHtml,
    boqColumnKey,
  }))
}
