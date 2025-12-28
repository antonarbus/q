import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import { roundTo } from 'round-to'
import { getRowFromStore } from '../redux/getter/getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  html: string
}

export const isRowPriceValid = (props: Props): boolean => {
  const row = getRowFromStore({ blockIndex: props.blockIndex, rowIndex: props.rowIndex })

  if (row === undefined) {
    return true
  }

  const priceValue = row.price.value
  const calculatedPriceValue = row.qty.value * row.itemPrice.value
  const calculatedPriceValueRounded = roundTo(calculatedPriceValue, 2)
  const isPriceValueValid = priceValue === calculatedPriceValueRounded

  if (isPriceValueValid === false) {
    return false
  }

  const cellTextContent = getTextContentFromHtml({ html: props.html })

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
