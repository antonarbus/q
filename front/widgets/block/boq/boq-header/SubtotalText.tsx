import { useRef } from 'react'
import { updateSubtotalTextCell } from '@features/blocks/cell/update-cell'
import {
  getBoqHeaderHtmlFromStore,
  useBlock,
  Froala,
  subTotalTextCellStyle,
  type HeaderKey,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/type/froala'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): React.JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onContentChange={() => {
        updateSubtotalTextCell({ editorRef, blockIndex, boqHeaderKey })
      }}
      placeholder='Subtotal...'
      style={subTotalTextCellStyle}
    />
  )
}
