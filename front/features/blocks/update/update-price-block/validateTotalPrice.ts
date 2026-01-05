import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@entities/quotation/util/getTotalPriceAbove'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const validateTotalPrice = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const currentHtml = props.editorRef.current.html.get()
  const cellTextContent = getTextContentFromHtml({ html: currentHtml })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  const price = getTotalPriceAbove({
    blockIndex: props.blockIndex,
    blocks: getState().quotation.blocks,
  })

  const isCorrectValue = cellValueFromHtml === price

  if (isCorrectValue === true) {
    return
  }

  const updatedHtml = getStringWithNewFormattedNumber({
    string: priceBlock.price.html,
    newNumber: price,
  })

  dispatch(
    quotationSlice.actions.updatePriceReducer({
      blockIndex: props.blockIndex,
      html: updatedHtml,
      value: price,
    }),
  )

  updateNumberAtHtmlIncrementally({
    oldNumber: priceBlock.price.value,
    newNumber: price,
    editor: props.editorRef.current,
    html: priceBlock.price.html,
  })
}
