import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalTextCellStyle } from '@entity/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { updateSubtotalText } from '@feature/blocks/update'
import { type JSX, useRef } from 'react'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import type { Editor } from '@tiptap/react'
import { useSelector } from '@shared/lib/redux'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  return (
    <Tiptap
      editorRef={editorRef}
      className='sub-total-text'
      placeholder='Subtotal...'
      isEditorActive={isEditorActive}
      content={getBoqHeaderHtmlFromStore({
        blockIndex: block.index,
        boqHeaderKey,
      })}
      onUpdate={(params) => {
        updateSubtotalText({
          editorRef,
          blockIndex: block.index,
          boqHeaderKey,
        })
      }}
      sx={subTotalTextCellStyle}
    />
  )
}
