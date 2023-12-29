import { dispatch, getState } from 'client/shared/clients'
import { getTextContentFromHtml } from 'client/shared/lib'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'
import { type BoqColumnKey } from 'client/shared/types'
import { itemsSlice } from 'client/entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  cellEditor: FroalaEditor | null
}

export const roundBoqCell = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
  cellEditor,
}: Props): void => {
  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  const value = row[boqColumnKey].value
  if (value === null) return
  const roundedValue = roundTo(value, 2)
  const shouldRound = value !== roundedValue

  if (shouldRound) {
    const htmlTextContent = getTextContentFromHtml({ html: row[boqColumnKey].html })
    if (htmlTextContent === null) return
    const newHtml = row[boqColumnKey].html.replace(String(value), String(roundedValue))

    dispatch(itemsSlice.actions.updateBoqCell({
      itemIndex,
      rowIndex,
      html: newHtml,
      value: roundedValue,
      boqColumnKey,
    }))

    if (cellEditor === null) return

    cellEditor.html.set(newHtml)
  }
}
