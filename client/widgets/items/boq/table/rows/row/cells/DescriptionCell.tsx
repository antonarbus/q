import { updateDescriptionCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle } from '@entities/items'
import type { BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, itemPriceCellEditorRef, descriptionEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqRowCellKey, minWidth: '200px' })

  return (
      <Froala
        className={`td ${boqRowCellKey}`}
        editorRef={descriptionEditorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef: descriptionEditorRef, itemIndex, rowIndex, boqRowCellKey })
        }}
        onKeydown={(e) => {
          const isTabKey = e.key === 'Tab'
          if (isTabKey) {
            e.preventDefault()
            itemPriceCellEditorRef.current?.commands.selectAll()
          }
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
