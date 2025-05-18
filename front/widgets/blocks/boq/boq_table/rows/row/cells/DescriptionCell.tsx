import { tabFromDescriptionCell } from '@features/blocks/cell/tab_away_from_cell'
import { updateDescriptionCell } from '@features/blocks/cell/update_cell'
import { beforeUpload } from '@features/file/upload_file'
import {
  getBoqCellHtmlFromStore,
  useRow,
  useBlock,
  Froala,
  useStylesForResizableCell,
  boqRowCellStyle,
  boqRowCellKey,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'

export const DescriptionCell = (): React.JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex, itemPriceCellEditorRef, descriptionEditorRef } = useRow()

  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.description,
    minWidth: `${columnMinWidth.description}px`,
  })

  return (
    <Froala
      className={`td ${boqRowCellKey.description}`}
      editorRef={descriptionEditorRef}
      placeholder='Description...'
      beforeUpload={beforeUpload}
      droppable
      htmlGetter={() =>
        getBoqCellHtmlFromStore({
          blockIndex,
          boqRowCellKey: boqRowCellKey.description,
          rowIndex,
        })
      }
      onContentChange={() => {
        updateDescriptionCell({
          blockIndex,
          boqRowCellKey: boqRowCellKey.description,
          editorRef: descriptionEditorRef,
          rowIndex,
        })
      }}
      onKeydown={(event: React.KeyboardEvent) => {
        tabFromDescriptionCell({
          event,
          itemPriceCellEditorRef,
          rowIndex,
        })
      }}
      wrapperStyles={stylesForResizableCell}
      style={{
        ...boqRowCellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': {
          left: 0,
        },
      }}
    />
  )
}
