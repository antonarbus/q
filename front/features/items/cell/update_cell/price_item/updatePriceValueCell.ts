import { dispatch, getState } from '@lib_instances/store'
import { itemKey, quotationSlice } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'
import { getNumberFromString, getTextContentFromHtml } from '@shared/utils'

type Props = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

export const updatePriceValueCell = ({ editorRef, itemIndex }: Props): void => {
  if (editorRef.current === null) return

  const priceBlock = getState().quotation.blocks[itemIndex]
  if (priceBlock?.type !== itemKey.price) return

  const prevHtml = priceBlock.price.html
  const html = editorRef.current.html.get()
  const didHtmlChange = prevHtml !== html

  if (!didHtmlChange) return

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(
    quotationSlice.actions.updatePriceReducer({
      itemIndex,
      html,
      value: cellValueFromHtml,
    }),
  )
}
