import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getCellHtmlFromStore } from '@entity/quotation/redux/getter/getCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { tabFromDescriptionCell } from '@feature/blocks/tab-away-from-cell'
import { updateDescriptionCell } from '@feature/blocks/update'
// import { beforeUpload } from '@feature/file/upload-file'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const block = useBlock()
  const row = useRow()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'description',
    minWidth: `${columnMinWidth.description}px`,
  })

  return (
    /*
    <Froala
      beforeUpload={beforeUpload}
      droppable
    />
    */
    <Tiptap
      editorRef={row.descriptionCellEditorRef}
      className='td description'
      placeholder='Description...'
      isEditorActive={isEditorActive}
      content={getCellHtmlFromStore({
        blockIndex: block.index,
        cellKey: 'description',
        rowIndex: row.index,
      })}
      onUpdate={(params) => {
        updateDescriptionCell({
          blockIndex: block.index,
          cellKey: 'description',
          editorRef: row.descriptionCellEditorRef,
          rowIndex: row.index,
        })
      }}
      onKeyDown={(_view, event) =>
        tabFromDescriptionCell({
          event,
          itemPriceCellEditorRef: row.itemPriceCellEditorRef,
          rowIndex: row.index,
        })
      }
      sx={{
        '.fr-placeholder': {
          left: 0,
        },
        ...stylesForResizableCell,
        ...cellStyle,
        textAlign: 'left',
      }}
    />
  )
}
