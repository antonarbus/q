import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { updateDescriptionCell } from '@feature/blocks/update/update-cell-at-bookmarked-row-block/description/updateDescriptionCell'
// import { beforeUpload } from '@feature/file/upload-file'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { JSX } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
    /*
    <Froala
      beforeUpload={beforeUpload}
      className='td description'
      editorRef={row.descriptionCellEditorRef}
      htmlGetter={() =>
        getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })
      }
      onContentChange={() => {
        updateDescriptionCell({
          editorRef: row.descriptionCellEditorRef,
        })
      }}
      placeholder='Description...'
      style={{
        ...cellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': { left: 0 },
      }}
      wrapperStyles={stylesForResizableCell}
    />
    */
    <Tiptap
      editorRef={row.descriptionCellEditorRef}
      className='td description'
      content={getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })}
      onContentChange={(params) => {
        updateDescriptionCell({
          editorRef: row.descriptionCellEditorRef,
        })
      }}
      sx={{
        ...cellStyle,
        textAlign: 'left',
        '.fr-placeholder': { left: 0 },
        ...stylesForResizableCell,
      }}
    />
  )
}
