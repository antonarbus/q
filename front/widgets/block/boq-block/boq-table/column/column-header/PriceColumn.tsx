import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateTableHeaderCellAtBoqBlock } from '@front/features/blocks/update-table-header-cell-at-boq-block/updateTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'

export const PriceColumn = (): React.JSX.Element => {
  const isEditorView = useIsEditorView()
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
        isEditorView={isEditorView}
        className='column-price'
        placeholder='Price...'
        contentGetter={() =>
          getHtmlOfBoqColumnFromStoreByIndex({
            blockIndex: block.index,
            boqColumnKey: 'price',
          })
        }
        onChange={() => {
          updateTableHeaderCellAtBoqBlock({
            blockIndex: block.index,
            boqColumnKey: 'price',
            editorName: 'boqBlockPriceColumn',
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
