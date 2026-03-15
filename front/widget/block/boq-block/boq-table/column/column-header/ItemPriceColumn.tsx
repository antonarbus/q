import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { updateColumnCell } from '@feature/blocks/change-table-header-cell-at-boq-block/updateColumnCell'

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
        editorRef={editorRef}
        className='column-item-price'
        placeholder='Item...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }
        onUpdate={(params) => {
          updateColumnCell({
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
