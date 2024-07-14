import { roundTo } from 'round-to'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'
import { getBoqRowByIndexFromStore } from '../redux/getters/getBoqRowByIndexFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  html: string
}

export const isBoqRowPriceValid = ({
  blockIndex,
  rowIndex,
  html,
}: Props): boolean => {
  const boqRow = getBoqRowByIndexFromStore({ blockIndex, rowIndex })
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

  const doesPriceValueMatchHtmlNumberValue =
    roundTo(cellValueFromHtml, 2) === calculatedPriceValueRounded
  if (!doesPriceValueMatchHtmlNumberValue) return false

  return true
}
