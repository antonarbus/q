import { useRef } from 'react'
import { updateSubtotalTextCell } from '@features/items/cell/update_cell'
import {
  getBoqHeaderHtmlFromStore,
  useBlock,
  Froala,
  subTotalTextCellStyle,
  type BoqHeaderKey,
} from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'

const boqHeaderKey: BoqHeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Subtotal...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onContentChange={() => {
        updateSubtotalTextCell({ editorRef, blockIndex, boqHeaderKey })
      }}
      style={subTotalTextCellStyle}
    />
  )
}
