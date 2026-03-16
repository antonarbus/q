import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { handleChangeOfDescriptionCell } from '@feature/blocks/handle-change-of-description-cell-at-boq-block/handleChangeOfDescriptionCell'
import { tabFromDescriptionCell } from '@feature/blocks/tab-away-from-description-cell/tabFromDescriptionCell'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

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
      registryKey={rowEditorKey({
        blockIndex: block.index,
        rowIndex: row.index,
        cellKey: 'description',
      })}
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
        handleChangeOfDescriptionCell({
          blockIndex: block.index,
          cellKey: 'description',
          rowIndex: row.index,
        })
      }}
      onUpload={upload}
      onKeyDown={(_view, event) =>
        tabFromDescriptionCell({
          event,
          blockIndex: block.index,
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
