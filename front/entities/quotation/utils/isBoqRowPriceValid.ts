import { roundTo } from 'round-to'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'

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
  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return true
  }

  const priceValue = boqRow.price.value
  const calculatedPriceValue = boqRow.qty.value * boqRow.itemPrice.value
  const calculatedPriceValueRounded = roundTo(calculatedPriceValue, 2)
  const isPriceValueValid = priceValue === calculatedPriceValueRounded

  if (isPriceValueValid === false) {
    return false
  }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  const doesPriceValueMatchHtmlNumberValue =
    roundTo(cellValueFromHtml, 2) === calculatedPriceValueRounded

  if (doesPriceValueMatchHtmlNumberValue === false) {
    return false
  }

  return true
}
