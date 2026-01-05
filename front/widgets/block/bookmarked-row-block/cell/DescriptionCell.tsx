import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateDescriptionCell } from '@features/blocks/update/update-cell-at-bookmarked-row-block/description/updateDescriptionCell'
import { beforeUpload } from '@features/file/upload-file'
import type { JSX } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
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
  )
}
