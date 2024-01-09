import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithNewFormattedNumber, updateNumberInHtmlIncrementally } from 'client/shared/lib'
import { roundTo } from 'round-to'
import { getBoqRowFromStore, updateBoqRowCellAtStore } from 'client/entities/items'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  itemPriceCellEditor: FroalaEditor | null
}

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const updateBoqRowItemPriceCell = ({
  itemIndex,
  rowIndex,
  itemPriceCellEditor,
}: Props): void => {
  if (itemPriceCellEditor === null) return

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newItemPriceValue = boqRow.price.value / boqRow.qty.value
  const newItemPriceValueRounded = roundTo(newItemPriceValue, 2)

  const itemPriceTextContent = getTextContentFromHtml({
    html: boqRow[boqColumnKey].html,
  })

  const itemPriceValueFromHtml = getNumberFromString({
    string: itemPriceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqRow[boqColumnKey].html,
    oldNumber: itemPriceValueFromHtml,
    newNumber: newItemPriceValueRounded,
  })

  // todo: move to items
  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey,
    html: updatedHtml,
  })

  void updateNumberInHtmlIncrementally({
    oldNumber: itemPriceValueFromHtml,
    newNumber: newItemPriceValueRounded,
    editor: itemPriceCellEditor,
    html: boqRow[boqColumnKey].html,
  })
}
