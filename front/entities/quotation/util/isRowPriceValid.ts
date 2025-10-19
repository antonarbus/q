import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { roundTo } from 'round-to'
import { getRowFromStore } from '../redux/getter/getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  html: string
}

export const isRowPriceValid = ({
  blockIndex,
  rowIndex,
  html,
}: Props): boolean => {
  const boqRow = getRowFromStore({ blockIndex, rowIndex })

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
