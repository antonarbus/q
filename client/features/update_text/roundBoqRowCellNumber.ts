import { dispatch } from 'client/shared/clients'
import { getStringWithReplaceNumber } from 'client/shared/lib'
import type FroalaEditor from 'froala-editor'
import { roundTo } from 'round-to'
import { type BoqColumnKey } from 'client/shared/types'
import { getBoqRow, itemsSlice } from 'client/entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  cellEditor: FroalaEditor | null
}

export const roundBoqRowCellNumber = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
  cellEditor,
}: Props): void => {
  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const value = boqRow[boqColumnKey].value
  if (value === null) return

  const roundedValue = roundTo(value, 2)

  const html = boqRow[boqColumnKey].html
  const htmlWithoutSpacesBetweenNumbers = html.replace(/(?<=\d)\s+(?=\d)/g, '')

  const newHtml = getStringWithReplaceNumber({
    string: htmlWithoutSpacesBetweenNumbers,
    oldNumber: value,
    newNumber: roundedValue,
  })

  if (htmlWithoutSpacesBetweenNumbers === newHtml) return

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
