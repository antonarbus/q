import { dispatch, getState } from '@shared/lib/redux'
import {
  itemType,
  quotationSlice,
  getTotalPriceAbove,
} from '@entities/quotation'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const validateTotalPrice = ({ editorRef, blockIndex }: Props): void => {
  if (editorRef.current === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[blockIndex]

  if (priceBlock?.type !== itemType.price) {
    return
  }

  const currentHtml = editorRef.current.html.get()
  const cellTextContent = getTextContentFromHtml({ html: currentHtml })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  const price = getTotalPriceAbove({
    blockIndex,
    blocks: getState().quotation.blocks,
  })

  const isCorrectValue = cellValueFromHtml === price

  if (isCorrectValue === true) {
    return
  }

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
}
