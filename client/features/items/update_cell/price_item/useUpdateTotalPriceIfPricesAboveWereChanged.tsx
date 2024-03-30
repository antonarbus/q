import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { getTotalPriceAbove, itemType, itemsSlice } from '@entities/items'
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
    const price = getTotalPriceAbove({ itemIndex, items: state.items })
    return price
  })

  useUpdateEffect(() => {
    if (editorRef.current === null) return

    const priceItem = getState().items[itemIndex]
    if (priceItem?.type !== itemType.price) return

    const updatedHtml = getStringWithNewFormattedNumber({
      string: priceItem.price.html,
      oldNumber: priceItem.price.value,
      newNumber: price,
    })

    dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html: updatedHtml, value: price }))

    console.log(666)
    // setTimeout(() => {
    void updateNumberAtHtmlIncrementally({
      oldNumber: priceItem.price.value,
      newNumber: price,
      editor: editorRef.current,
      html: priceItem.price.html,
    })
    // }, 0)
  }, [price])
}
