import type FroalaEditor from 'froala-editor'
import { getNumber, getTextContent, replaceNumber } from 'client/shared/lib'
import { updateBoqCellAtStore } from './updateBoqCellAtStore'
import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
  priceCellEditor: FroalaEditor | null
}

export const updatePriceCell = ({
  itemIndex,
  rowIndex,
  priceCellEditor,
}: Props): void => {
  if (priceCellEditor === null) return

  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return

  const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  const priceTextContent = getTextContent({
    html: boqRow.price.html,
  })

  const priceValueFromHtml = getNumber({
    string: priceTextContent,
  })

  const updatedHtml = replaceNumber({
    html: boqRow.price.html,
    oldNumber: priceValueFromHtml,
    newNumber: newPriceValueRounded,
  })

  updateBoqCellAtStore({
    itemIndex,
    rowIndex,
    boqColumnKey: 'price',
    html: updatedHtml,
  })

  priceCellEditor.html.set(updatedHtml)
}
