import { tabFromDescriptionCell } from '@features/cell/tab_away_from_cell'
import { updateDescriptionCell } from '@features/cell/update_cell'
import { beforeUpload } from '@features/upload'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle, boqRowCellKey, boqColumnKey } from '@entities/quotation'

export const DescriptionCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, itemPriceCellEditorRef, descriptionEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqColumnKey.description, minWidth: '200px' })

  return (
      <Froala
        className={`td ${boqRowCellKey.description}`}
        editorRef={descriptionEditorRef}
        placeholder='Description...'
        beforeUpload={beforeUpload}
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.description })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef: descriptionEditorRef, itemIndex, rowIndex, boqRowCellKey: boqRowCellKey.description })
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
