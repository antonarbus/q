import {
  boqColumnKey,
  boqRowCellKey,
  boqRowCellStyle,
  columnMinWidth,
  Froala,
  getBoqCellHtmlFromStore,
  useBlock,
  useRow,
  useStylesForResizableCell,
} from '@entities/quotation'
import { tabFromDescriptionCell } from '@features/blocks/cell/tab-away-from-cell'
import { updateDescriptionCell } from '@features/blocks/cell/update-cell'
import { beforeUpload } from '@features/file/upload-file'
import type { JSX, KeyboardEvent } from 'react'

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
      beforeUpload={beforeUpload}
      className={`td ${boqRowCellKey.description}`}
      droppable
      editorRef={descriptionEditorRef}
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
      onKeydown={(event: KeyboardEvent) => {
        tabFromDescriptionCell({
          event,
          itemPriceCellEditorRef,
          rowIndex,
        })
      }}
      placeholder='Description...'
      style={{
        ...boqRowCellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': {
          left: 0,
        },
      }}
      wrapperStyles={stylesForResizableCell}
    />
  )
}
