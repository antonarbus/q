import type FroalaEditor from 'froala-editor'
import { getNumberFromString, getTextContentFromHtml, getStringWithReplacedNumber } from 'client/shared/lib'
import { updateBoqRowCellAtStore } from './updateBoqRowCellAtStore'
import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
  priceCellEditor: FroalaEditor | null
}

export const updateBoqRowPriceCell = ({
  itemIndex,
  rowIndex,
  priceCellEditor,
}: Props): void => {
  if (priceCellEditor === null) return

  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  const priceTextContent = getTextContentFromHtml({
    html: boqRow.price.html,
  })

  const priceValueFromHtml = getNumberFromString({
    string: priceTextContent,
  })

  const updatedHtml = getStringWithReplacedNumber({
    string: boqRow.price.html,
    oldNumber: priceValueFromHtml,
    newNumber: newPriceValueRounded,
  })

  updateBoqRowCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey: 'price',
    html: updatedHtml,
  })

  priceCellEditor.html.set(updatedHtml)
}
