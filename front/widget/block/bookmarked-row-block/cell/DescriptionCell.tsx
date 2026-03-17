import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { handleChangeOfDescriptionCell } from '@feature/blocks/handle-change-of-description-cell-at-bookmark-block/handleChangeOfDescriptionCell'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'

export const DescriptionCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
    <TextEditor
      registryKey={{
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
        cellKey: 'descriptionCell',
      }}
      className='td description'
      placeholder='Description...'
      contentGetter={() =>
        getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })
      }
      onUpdate={(params) => {
        handleChangeOfDescriptionCell({})
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
