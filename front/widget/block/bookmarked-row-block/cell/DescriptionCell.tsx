import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { getBookmarkedRowCellHtmlFromStore } from '@entity/quotation/redux/getter/getBookmarkedRowCellHtmlFromStore'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { onChangeDescriptionCellAtBookmarkBlock } from '@feature/blocks/on-text-change/on-change-description-cell-at-bookmark-block/onChangeDescriptionCellAtBookmarkBlock'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

export const DescriptionCell = (): React.JSX.Element => {
  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: 'description',
    minWidth: columnMinWidth.description,
  })

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockDescriptionCell',
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        rowIndex: 0,
      })}
      className='td description'
      placeholder='Description...'
      contentGetter={() =>
        getBookmarkedRowCellHtmlFromStore({ cellKey: 'description' })
      }
      onUpdate={() => {
        onChangeDescriptionCellAtBookmarkBlock()
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
