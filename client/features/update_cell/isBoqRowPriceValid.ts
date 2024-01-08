import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'
import { getNumberFromString, getTextContentFromHtml } from 'client/shared/lib'

type Props = {
  itemIndex: number
  rowIndex: number
  html: string
}

export const isBoqRowPriceValid = ({
  itemIndex,
  rowIndex,
  html,
}: Props): boolean => {
  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return true
  const priceValue = boqRow.price.value
  const calculatedPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const calculatedPriceValueRounded = roundTo(calculatedPriceValue, 2)
  const isPriceValueValid = priceValue === calculatedPriceValueRounded
  if (!isPriceValueValid) return false

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  const doesPriceValueMatchHtmlNumberValue = roundTo(cellValueFromHtml, 2) === calculatedPriceValueRounded
  if (!doesPriceValueMatchHtmlNumberValue) return false

  return true
}
