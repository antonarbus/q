import { getState } from 'client/shared/clients'
import { getNumberFromString, getTextContentFromHtml } from 'client/shared/lib'
import type FroalaEditor from 'froala-editor'
import { updateBoqCell } from './updateBoqCell'
import { roundTo } from 'round-to'

type Props = {
  itemIndex: number
  rowIndex: number
  priceCellEditor: FroalaEditor | null
}

export const updatePriceCell = ({ itemIndex, rowIndex, priceCellEditor }: Props): void => {
  if (priceCellEditor === null) return

  const item = getState().items[itemIndex]
  if (item?.type !== 'boq') return

  const row = item.boq.rows[rowIndex]
  if (row === undefined) return

  const newPriceValue = row.qty.value * row.itemPrice.value
  console.log('🚀  newPriceValue:', newPriceValue)
  const roundedPriceValue = roundTo(newPriceValue, 2)
  console.log('🚀  roundedPriceValue:', roundedPriceValue)

  const priceHtmlTextContent = getTextContentFromHtml({ html: row.price.html })
  const value = getNumberFromString({ string: priceHtmlTextContent })
  console.log('🚀  value:', value)

  const newPriceHtml = row.price.html.replace(String(value), String(roundedPriceValue))
  console.log('🚀  newPriceHtml:', newPriceHtml)

  updateBoqCell({
    itemIndex,
    rowIndex,
    boqColumnKey: 'price',
    html: newPriceHtml,
  })

  priceCellEditor.html.set(newPriceHtml)
}
