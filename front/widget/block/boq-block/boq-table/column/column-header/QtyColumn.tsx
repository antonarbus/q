import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import { onChangeTableHeaderCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-table-header-cell-at-boq-block/onChangeTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const QtyColumn = (): React.JSX.Element => {
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockQtyColumn',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='column-qty'
        placeholder='Qty...'
        contentGetter={() =>
          getHtmlOfBoqColumnFromStoreByIndex({
            blockIndex: block.index,
            boqColumnKey: 'qty',
          })
        }
        onChange={() => {
          onChangeTableHeaderCellAtBoqBlock({
            blockIndex: block.index,
            boqColumnKey: 'qty',
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
