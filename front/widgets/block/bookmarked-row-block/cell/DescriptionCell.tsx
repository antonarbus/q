import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { getHtmlOfBookmarkedRowCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfBookmarkedRowCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { updateDescriptionCellAtBookmarkBlock } from '@front/features/blocks/update-description-cell-at-bookmark-block/updateDescriptionCellAtBookmarkBlock'
import { upload } from '@front/features/file/upload-file'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

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
        getHtmlOfBookmarkedRowCellFromStoreByIndex({ cellKey: 'description' })
      }
      onChange={() => {
        updateDescriptionCellAtBookmarkBlock()
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
