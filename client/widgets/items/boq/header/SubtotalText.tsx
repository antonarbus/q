import { getBoqHeaderHtmlFromStore, useItem, Froala, subTotalTextCellStyle } from '@entities/items'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqHeaderKey } from '@shared/types'
import { updateSubtotalTextCell } from '@features/update_cell'

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
