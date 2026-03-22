import { columnMinWidth } from '@front/entities/quotation/const/columnMinWidth'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateTableHeaderCellAtBoqBlock } from '@front/features/blocks/update-table-header-cell-at-boq-block/updateTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const PriceColumn = (): React.JSX.Element => {
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
