import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { getTotalPriceAbove, itemKey, quotationSlice } from '@entities/quotation'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { type FroalaEditorRef } from '@shared/types'
import { getStringWithNewFormattedNumber } from '@shared/utils'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const useUpdateTotalPriceIfPricesAboveWereChanged = ({
  itemIndex,
  editorRef,
}: Props): void => {
  const price = useSelectorTyped(state => {
    const price = getTotalPriceAbove({ itemIndex, items: state.quotation })
    return price
  })

  useUpdateEffect(() => {
    if (editorRef.current === null) return

    const priceItem = getState().quotation[itemIndex]
    if (priceItem?.type !== itemKey.price) return

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
  }, [price])
}
