import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateDescriptionCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle } from '@entities/items'
import type { BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex, itemPriceCellEditorRef } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqRowCellKey, minWidth: '200px' })

  return (
      <Froala
        className={`td ${boqRowCellKey}`}
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef, itemIndex, rowIndex, boqRowCellKey })
        }}
        onKeydown={(e) => {
          console.log('🚀 ~ e:', e)
          // e.stopPropagation()
          const isTabKey = e.key === 'Tab'
          if (isTabKey) {
            e.originalEvent.preventDefault()
            itemPriceCellEditorRef.current?.commands.selectAll()
            return false
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
