import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { updateColumnCell } from '@feature/blocks/update'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import type { Editor } from '@tiptap/react'
import { useSelector } from '@shared/lib/redux'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <Tiptap
        editorRef={editorRef}
        className='column-qty'
        placeholder='Qty...'
        isEditorActive={isEditorActive}
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'qty',
        })}
        onUpdate={(params) => {
          updateColumnCell({
            blockIndex: block.index,
            boqColumnKey: 'qty',
            editorRef,
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
