import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import { onChangeTableHeaderCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-table-header-cell-at-boq-block/onChangeTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
          onChangeTableHeaderCellAtBoqBlock({
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
