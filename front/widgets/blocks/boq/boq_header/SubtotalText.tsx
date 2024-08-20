import { useRef } from 'react'
import { updateSubtotalTextCell } from '@features/blocks/cell/update_cell'
import {
  getBoqHeaderHtmlFromStore,
  useBlock,
  Froala,
  subTotalTextCellStyle,
  type HeaderKey,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'

const boqHeaderKey: HeaderKey = 'subtotalText'

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
