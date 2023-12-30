import { getBoqRow, itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { getNumber, getTextContent } from 'client/shared/lib'
import type { BoqColumnKey } from 'client/shared/types'

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
  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const prevHtml = boqRow[boqColumnKey].html
  const didTextChange = prevHtml !== html
  if (!didTextChange) return

  const cellTextContent = getTextContent({ html })

  const cellValueFromHtml = getNumber({
    string: cellTextContent,
  })

  dispatch(itemsSlice.actions.updateBoqCell({
    itemIndex,
    rowIndex,
    html,
    value: cellValueFromHtml,
    boqColumnKey,
  }))
}
