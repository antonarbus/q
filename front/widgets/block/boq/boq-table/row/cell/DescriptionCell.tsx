import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { cellKey } from '@entities/quotation/const/cellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entities/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { tabFromDescriptionCell } from '@features/blocks/tab-away-from-cell'
import { updateDescriptionCell } from '@features/blocks/update'
import { beforeUpload } from '@features/file/upload-file'
import type { JSX, KeyboardEvent } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: boqColumnKey.description,
    minWidth: `${columnMinWidth.description}px`,
  })

  return (
    <Froala
      beforeUpload={beforeUpload}
      className={`td ${cellKey.description}`}
      droppable
      editorRef={row.descriptionEditorRef}
      htmlGetter={() =>
        getCellHtmlFromStore({
          blockIndex: block.index,
          cellKey: cellKey.description,
          rowIndex: row.index,
        })
      }
      onContentChange={() => {
        updateDescriptionCell({
          blockIndex: block.index,
          cellKey: cellKey.description,
          editorRef: row.descriptionEditorRef,
          rowIndex: row.index,
        })
      }}
      onKeydown={(event: KeyboardEvent) => {
        tabFromDescriptionCell({
          event,
          itemPriceCellEditorRef: row.itemPriceCellEditorRef,
          rowIndex: row.index,
        })
      }}
      placeholder='Description...'
      style={{
        ...cellStyle,
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
