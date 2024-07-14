import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import {
  getTotalPriceAbove,
  itemKey,
  quotationSlice,
} from '@entities/quotation'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { type FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const useUpdateTotalPriceIfPricesAboveWereChanged = ({
  blockIndex,
  editorRef,
}: Props): void => {
  const price = useSelectorTyped((state) => {
    const priceValue = getTotalPriceAbove({
      blockIndex,
      blocks: state.quotation.blocks,
    })
    return priceValue
  })

  useUpdateEffect(() => {
    if (editorRef.current === null) return

    const priceBlock = getState().quotation.blocks[blockIndex]
    if (priceBlock?.type !== itemKey.price) return

    const updatedHtml = getStringWithNewFormattedNumber({
      string: priceBlock.price.html,
      oldNumber: priceBlock.price.value,
      newNumber: price,
    })

    dispatch(
      quotationSlice.actions.updatePriceReducer({
        blockIndex,
        html: updatedHtml,
        value: price,
      }),
    )

    void updateNumberAtHtmlIncrementally({
      oldNumber: priceBlock.price.value,
      newNumber: price,
      editor: editorRef.current,
      html: priceBlock.price.html,
    })
  }, [price])
}
