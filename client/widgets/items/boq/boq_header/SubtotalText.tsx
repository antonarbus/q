import { useRef } from 'react'
import { updateSubtotalTextCell } from '@features/items/update_cell'
import { getBoqHeaderHtmlFromStore, useItem, Froala, subTotalTextCellStyle } from '@entities/quotation'
import { type BoqHeaderKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

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
      style={subTotalTextCellStyle}
    />
  )
}
