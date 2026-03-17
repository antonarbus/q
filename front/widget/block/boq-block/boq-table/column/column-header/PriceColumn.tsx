import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { handleChangeOfColumnCell } from '@feature/blocks/handle-change-of-table-header-cell-at-boq-block/handleChangeOfColumnCell'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const PriceColumn = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='price'
      className='th price resizable'
      minWidth={columnMinWidth.price}
    >
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockPriceColumn',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='column-price'
        placeholder='Price...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'price',
          })
        }
        onUpdate={(params) => {
          handleChangeOfColumnCell({
            blockIndex: block.index,
            boqColumnKey: 'price',
            editorRef,
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
