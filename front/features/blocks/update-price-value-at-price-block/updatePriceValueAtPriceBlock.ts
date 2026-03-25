import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { getNumberFromString } from '@front/shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@front/shared/util/getTextContentFromHtml'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const updatePriceValueAtPriceBlock = (props: Props): void => {
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

  const priceBlock = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const prevHtml = priceBlock.price.html
  const html = editor.getHTML()
  const didHtmlChange = prevHtml !== html

  if (didHtmlChange === false) {
    return
  }

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  reduxHolder.dispatch(
    quotationSlice.actions.updatePrice({
      blockIndex: props.blockIndex,
      html,
      value: cellValueFromHtml,
    }),
  )
}
