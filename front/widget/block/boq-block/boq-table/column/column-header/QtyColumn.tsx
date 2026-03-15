import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { changeColumnCell } from '@feature/blocks/change-table-header-cell-at-boq-block/changeColumnCell'

export const QtyColumn = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <TextEditor
        editorRef={editorRef}
        className='column-qty'
        placeholder='Qty...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'qty',
          })
        }
        onUpdate={(params) => {
          changeColumnCell({
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
