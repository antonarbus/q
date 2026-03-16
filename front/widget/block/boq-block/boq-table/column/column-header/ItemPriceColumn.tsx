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

export const ItemPriceColumn = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='itemPrice'
      className='th itemPrice resizable'
      minWidth={columnMinWidth.itemPrice}
    >
      <TextEditor
        registryKey={blockEditorKey({
          blockIndex: block.index,
          editorName: 'itemPriceColumn',
        })}
        className='column-item-price'
        placeholder='Item...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }
        onUpdate={(params) => {
          handleChangeOfColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
