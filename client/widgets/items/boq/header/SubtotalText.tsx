import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateSubtotalTextCell } from '@features/update_cell'
import { getBoqHeaderHtmlFromStore, useItem, Froala, subTotalTextCellStyle } from '@entities/items'
import { type BoqHeaderKey } from '@entities/items'

const boqHeaderKey: BoqHeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Subtotal...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        updateSubtotalTextCell({ editorRef, itemIndex, boqHeaderKey })
      }}
      additionalStyle={subTotalTextCellStyle}
    />
  )
}
