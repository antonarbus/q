import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { handleChangeOfColumnCell } from '@feature/blocks/handle-change-of-table-header-cell-at-boq-block/handleChangeOfColumnCell'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'

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
        registryKey={blockEditorKey({
          blockIndex: block.index,
          editorName: 'qtyColumn',
        })}
        className='column-qty'
        placeholder='Qty...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'qty',
          })
        }
        onUpdate={(params) => {
          handleChangeOfColumnCell({
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
