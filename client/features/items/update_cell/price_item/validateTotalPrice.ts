import { dispatch, getState } from '@lib_instances/store'
import { itemKey, quotationSlice, getTotalPriceAbove } from '@entities/quotation'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { type FroalaEditorRef } from '@shared/types'
import { getNumberFromString, getStringWithNewFormattedNumber, getTextContentFromHtml } from '@shared/utils'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const validateTotalPrice = ({
  editorRef,
  itemIndex,
}: Props): void => {
  if (editorRef.current === null) return

  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemKey.price) return

  const currentHtml = editorRef.current.html.get()
  const cellTextContent = getTextContentFromHtml({ html: currentHtml })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  const price = getTotalPriceAbove({ itemIndex, items: getState().items })
  const isCorrectValue = cellValueFromHtml === price

  if (isCorrectValue) return

  const updatedHtml = getStringWithNewFormattedNumber({
    string: priceItem.price.html,
    oldNumber: priceItem.price.value,
    newNumber: price,
  })

  dispatch(quotationSlice.actions.updatePriceReducer({ itemIndex, html: updatedHtml, value: price }))

  void updateNumberAtHtmlIncrementally({
    oldNumber: priceItem.price.value,
    newNumber: price,
    editor: editorRef.current,
    html: priceItem.price.html,
  })
}
