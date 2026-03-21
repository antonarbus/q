import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import { updateTableHeaderCellAtBoqBlock } from '@feature/blocks/update-table-header-cell-at-boq-block/updateTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const DescriptionColumn = (): React.ReactNode => {
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='description'
      className='th description resizable'
      minWidth={columnMinWidth.description}
    >
      <TextEditor
        registryKey={getRegistryKey({
          editorName: 'boqBlockDescriptionColumn',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='column-description'
        placeholder='Description...'
        contentGetter={() =>
          getHtmlOfBoqColumnFromStoreByIndex({
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }
        onChange={() => {
          updateTableHeaderCellAtBoqBlock({
            blockIndex: block.index,
            boqColumnKey: 'description',
            editorName: 'boqBlockDescriptionColumn',
          })
        }}
        sx={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
