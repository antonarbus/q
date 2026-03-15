import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { changeDescriptionCell } from '@feature/blocks/change-description-cell-at-bookmark-block/changeDescriptionCell'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'

export const DescriptionCell = (): React.JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
    <TextEditor
      editorRef={row.descriptionCellEditorRef}
      className='td description'
      placeholder='Description...'
      contentGetter={() =>
        getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })
      }
      onUpdate={(params) => {
        changeDescriptionCell({
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
