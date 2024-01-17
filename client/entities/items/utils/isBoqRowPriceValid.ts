import { roundTo } from 'round-to'
import { getBoqRowFromStore } from '@entities/items'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'

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
  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
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
