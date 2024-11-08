import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import {
  getTotalPriceAbove,
  itemType,
  quotationSlice,
} from '@entities/quotation'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const useUpdateTotalPriceIfPricesAboveWereChanged = ({
  blockIndex,
  editorRef,
}: Props): void => {
  const price = useSelector((state) => {
    const priceValue = getTotalPriceAbove({
      blockIndex,
      blocks: state.quotation.blocks,
    })

    return priceValue
  })

  useUpdateEffect(() => {
    if (editorRef.current === null) return

    const priceBlock = getState().quotation.blocks[blockIndex]
    if (priceBlock?.type !== itemType.price) return

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

    updateNumberAtHtmlIncrementally({
      oldNumber: priceBlock.price.value,
      newNumber: price,
      editor: editorRef.current,
      html: priceBlock.price.html,
    })
  }, [price])
}
