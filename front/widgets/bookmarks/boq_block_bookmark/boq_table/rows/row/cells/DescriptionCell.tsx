import { tabFromDescriptionCell } from '@features/blocks/cell/tab_away_from_cell'
import { beforeUpload } from '@features/upload'
import {
  useRow,
  useBlock,
  Froala,
  useStylesForResizableCell,
  boqRowCellStyle,
  boqRowCellKey,
  boqColumnKey,
  itemType,
} from '@entities/quotation'
import { bookmarkSignal } from '@entities/bookmark'

export const DescriptionCell = (): JSX.Element => {
  const { blockIndex } = useBlock()
  const { rowIndex, itemPriceCellEditorRef, descriptionEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({
    blockIndex,
    boqColumnKey: boqColumnKey.description,
    minWidth: '200px',
  })

  return (
    <Froala
      className={`td ${boqRowCellKey.description}`}
      editorRef={descriptionEditorRef}
      placeholder='Description...'
      beforeUpload={beforeUpload}
      htmlGetter={() => {
        if (bookmarkSignal.value?.type !== itemType.boq) return ''
        const row = bookmarkSignal.value.boq.rows[rowIndex]
        if (!row) return ''
        const html = row.description.html
        return html
      }}
      onContentChange={() => {
        if (descriptionEditorRef.current === null) return
        if (bookmarkSignal.value?.type !== itemType.boq) return
        const html = descriptionEditorRef.current.html.get()
        const clonedBookmark = structuredClone(bookmarkSignal.value)
        const row = clonedBookmark.boq.rows[rowIndex]
        if (!row) return
        row.description.html = html
        bookmarkSignal.value = clonedBookmark
      }}
      onKeydown={(e) => {
        tabFromDescriptionCell({ e, rowIndex, itemPriceCellEditorRef })
      }}
      wrapperStyles={stylesForResizableCell}
      style={{
        ...boqRowCellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': { left: 0 },
      }}
    />
  )
}
