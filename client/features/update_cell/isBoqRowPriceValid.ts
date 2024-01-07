import { roundTo } from 'round-to'
import { getBoqRow } from 'client/entities/items'

type Props = {
  itemIndex: number
  rowIndex: number
}

export const isBoqRowPriceValid = ({
  itemIndex,
  rowIndex,
}: Props): boolean => {
  const boqRow = getBoqRow({ itemIndex, rowIndex })
  if (boqRow === undefined) return true
  const price = boqRow.price.value
  const calculatedPrice = boqRow.qty.value * boqRow.itemPrice.value
  const calculatedPriceRounded = roundTo(calculatedPrice, 2)
  const isPriceValid = price === calculatedPriceRounded
  return isPriceValid
}
