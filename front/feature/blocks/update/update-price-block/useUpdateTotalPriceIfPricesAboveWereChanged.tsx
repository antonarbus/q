import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@entity/quotation/util/getTotalPriceAbove'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { useUpdateEffect } from 'react-use'

type Props = {
  editorRef: EditorRef
  blockIndex: number
}

export const useUpdateTotalPriceIfPricesAboveWereChanged = (
  props: Props,
): void => {
  const totalPrice = useSelector((state) => {
    const totalPriceAbove = getTotalPriceAbove({
      blockIndex: props.blockIndex,
      blocks: state.quotation.blocks,
    })

    return totalPriceAbove
  })

  useUpdateEffect(() => {
    if (props.editorRef.current === null) {
      return
    }

    const priceBlock = getState().quotation.blocks[props.blockIndex]

    if (priceBlock?.type !== 'price') {
      return
    }

    const updatedHtml = getStringWithNewFormattedNumber({
      string: priceBlock.price.html,
      newNumber: totalPrice,
    })

    dispatch(
      quotationSlice.actions.updatePriceReducer({
        blockIndex: props.blockIndex,
        html: updatedHtml,
        value: totalPrice,
      }),
    )

    updateNumberAtHtmlIncrementally({
      oldNumber: priceBlock.price.value,
      newNumber: totalPrice,
      editor: props.editorRef.current,
      html: priceBlock.price.html,
    })
  }, [totalPrice])
}
