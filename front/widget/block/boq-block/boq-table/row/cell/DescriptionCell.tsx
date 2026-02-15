import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { tabFromDescriptionCell } from '@feature/blocks/tab-away-from-cell'
import { updateDescriptionCell } from '@feature/blocks/update'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'

export const DescriptionCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'description',
    minWidth: `${columnMinWidth.description}px`,
  })

  return (
    <TextEditor
      editorRef={row.descriptionCellEditorRef}
      className='td description'
      placeholder='Description...'
      contentGetter={() =>
        getCellHtmlFromStore({
          blockIndex: block.index,
          cellKey: 'description',
          rowIndex: row.index,
        })
      }
      onUpdate={(params) => {
        updateDescriptionCell({
          blockIndex: block.index,
          cellKey: 'description',
          editorRef: row.descriptionCellEditorRef,
          rowIndex: row.index,
        })
      }}
      onUpload={upload}
      onKeyDown={(_view, event) =>
        tabFromDescriptionCell({
          event,
          itemPriceCellEditorRef: row.itemPriceCellEditorRef,
          rowIndex: row.index,
        })
      }
      sx={{
        ...stylesForResizableCell,
        ...cellStyle,
        textAlign: 'left',
      }}
    />
  )
}
