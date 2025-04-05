import { beforeUpload } from '@features/upload'
import {
  useRow,
  Froala,
  useStylesForResizableCell,
  boqRowCellStyle,
  boqRowCellKey,
  boqColumnKey,
  getRowCellHtmlFromStore,
  BOOKMARK_POS_AT_BLOCKS,
  columnMinWidth,
} from '@entities/quotation'
import { updateDescriptionCell } from '@features/blocks/cell/update_cell/row_block_cells/description/updateDescriptionCell'

export const DescriptionCell = (): React.JSX.Element => {
  const { descriptionEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.description,
    minWidth: columnMinWidth.description,
  })

  return (
    <Froala
      className={`td ${boqRowCellKey.description}`}
      editorRef={descriptionEditorRef}
      placeholder='Description...'
      beforeUpload={beforeUpload}
      wrapperStyles={stylesForResizableCell}
      htmlGetter={() =>
        getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.description })
      }
      onContentChange={() => {
        updateDescriptionCell({
          editorRef: descriptionEditorRef,
        })
      }}
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
