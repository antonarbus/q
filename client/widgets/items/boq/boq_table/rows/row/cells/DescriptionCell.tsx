import { tabFromDescriptionCell } from '@features/items/tab_away_from_cell'
import { updateDescriptionCell } from '@features/items/update_cell'
import { beforeUpload } from '@features/items/upload'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle, boqRowCellKey, boqColumnKey } from '@entities/items'

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
        additionalStyle={{
          ...boqRowCellStyle,
          textAlign: 'left',
          '.fr-placeholder': {
            left: 0,
          },
        }}
      />
  )
}
