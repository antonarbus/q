import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { getHtmlOfBoqColumnFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBoqColumnFromStoreByIndex'
import { columnHeaderStyle } from '@front/entities/quotation/style/columnHeaderStyle'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@front/shared/component/TextEditor'
import { updateTableHeaderCellAtBoqBlock } from '@front/features/blocks/update-table-header-cell-at-boq-block/updateTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

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
