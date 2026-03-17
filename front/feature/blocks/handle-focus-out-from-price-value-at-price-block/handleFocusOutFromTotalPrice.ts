import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@entity/quotation/util/getTotalPriceAbove'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const handleFocusOutFromTotalPrice = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'priceBlockPrice',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const currentHtml = editor.getHTML()
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
    quotationSlice.actions.updatePrice({
      blockIndex: props.blockIndex,
      html: updatedHtml,
      value: price,
    }),
  )

  updateNumberAtHtmlIncrementally({
    oldNumber: priceBlock.price.value,
    newNumber: price,
    totalPriceValueEditor: editor,
    html: priceBlock.price.html,
  })
}
