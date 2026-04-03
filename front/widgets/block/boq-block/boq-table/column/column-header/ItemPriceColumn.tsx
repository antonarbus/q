import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateTableHeaderCellAtBoqBlock } from '@front/features/blocks/update-table-header-cell-at-boq-block/updateTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'

export const ItemPriceColumn = (): React.JSX.Element => {
  const isFullAppView = useIsFullAppView()
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
        isFullAppView={isFullAppView}
        className='column-item-price'
        placeholder='Item...'
        contentGetter={() =>
          getHtmlOfBoqColumnFromStoreByIndex({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }
        onChange={() => {
          updateTableHeaderCellAtBoqBlock({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
            editorName: 'boqBlockItemPriceColumn',
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
