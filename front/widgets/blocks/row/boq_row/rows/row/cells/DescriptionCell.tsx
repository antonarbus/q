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
  const { descriptionEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex: 1000,
    boqColumnKey: boqColumnKey.description,
    minWidth: '200px',
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
