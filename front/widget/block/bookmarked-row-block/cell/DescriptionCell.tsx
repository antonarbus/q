import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { updateDescriptionCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/description/updateDescriptionCell'
import { useSelector } from '@shared/lib/redux'
import { upload } from '@feature/file/upload-file'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import type { JSX } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const row = useRow()
  const isEditorActive = useSelector((state) => state.text.isEditable)

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
    <Tiptap
      editorRef={row.descriptionCellEditorRef}
      className='td description'
      placeholder='Description...'
      isEditorActive={isEditorActive}
      content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })}
      onUpdate={(params) => {
        updateDescriptionCell({
          editorRef: row.descriptionCellEditorRef,
        })
      }}
      onUpload={upload}
      sx={{
        ...stylesForResizableCell,
        ...cellStyle,
        textAlign: 'left',
      }}
    />
  )
}
