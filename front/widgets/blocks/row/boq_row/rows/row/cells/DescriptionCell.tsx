import { tabFromDescriptionCell } from '@features/blocks/cell/tab_away_from_cell'
import { beforeUpload } from '@features/upload'
import {
  useRow,
  Froala,
  useStylesForResizableCell,
  boqRowCellStyle,
  boqRowCellKey,
  boqColumnKey,
  getRowCellHtmlFromStore,
} from '@entities/quotation'
import { updateDescriptionCell } from '@features/blocks/cell/update_cell/row_block_cells/description/updateDescriptionCell'

export const DescriptionCell = (): JSX.Element => {
  const { rowIndex, itemPriceCellEditorRef, descriptionEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 0,
    boqColumnKey: boqColumnKey.description,
    minWidth: '200px',
  })

  return (
    <Froala
      className={`td ${boqRowCellKey.description}`}
      editorRef={descriptionEditorRef}
      placeholder='Description...'
      beforeUpload={beforeUpload}
      htmlGetter={() =>
        getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.description })
      }
      onContentChange={() => {
        updateDescriptionCell({
          editorRef: descriptionEditorRef,
        })
      }}
      onKeydown={(e) => {
        tabFromDescriptionCell({ e, rowIndex, itemPriceCellEditorRef })
      }}
      wrapperStyles={stylesForResizableCell}
      style={{
        ...boqRowCellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': { left: 0 },
      }}
    />
  )
}
