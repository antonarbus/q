import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { onChangeTableHeaderCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-table-header-cell-at-boq-block/onChangeTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        registryKey={getRegistryKey({
          editorName: 'boqBlockItemPriceColumn',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='column-item-price'
        placeholder='Item...'
        contentGetter={() =>
          getHtmlOfBoqColumnFromStoreByIndex({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }
        onChange={() => {
          onChangeTableHeaderCellAtBoqBlock({
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
