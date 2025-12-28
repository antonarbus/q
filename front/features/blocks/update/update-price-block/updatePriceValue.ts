import { itemType } from '@entities/quotation/const/itemType'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'

type Props = {
  editorRef: FroalaEditorRef
  blockIndex: number
}

export const updatePriceValue = (props: Props): void => {
  if (props.editorRef.current === null) {
    return
  }

  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== itemType.price) {
    return
  }

  const prevHtml = priceBlock.price.html
  const html = props.editorRef.current.html.get()
  const didHtmlChange = prevHtml !== html

  if (didHtmlChange === false) {
    return
  }

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(
    quotationSlice.actions.updatePriceReducer({
      blockIndex: props.blockIndex,
      html,
      value: cellValueFromHtml,
    }),
  )
}
