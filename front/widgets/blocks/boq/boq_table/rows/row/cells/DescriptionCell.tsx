import { tabFromDescriptionCell } from '@features/blocks/cell/tab_away_from_cell'
import { updateDescriptionCell } from '@features/blocks/cell/update_cell'
import { beforeUpload } from '@features/upload'
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

export const DescriptionCell = (): JSX.Element => {
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
          rowIndex,
          boqRowCellKey: boqRowCellKey.description,
        })
      }
      onContentChange={() => {
        updateDescriptionCell({
          editorRef: descriptionEditorRef,
          blockIndex,
          rowIndex,
          boqRowCellKey: boqRowCellKey.description,
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
        '.fr-placeholder': {
          left: 0,
        },
      }}
    />
  )
}
