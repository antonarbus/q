import {
  Froala,
  getBoqHeaderHtmlFromStore,
  type HeaderKey,
  subTotalTextCellStyle,
  useBlock,
} from '@entities/quotation'
import { updateSubtotalTextCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/type/froala'
import { type JSX, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
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
