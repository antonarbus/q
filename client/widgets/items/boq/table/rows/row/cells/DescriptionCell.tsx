import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateDescriptionCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle } from '@entities/items'
import type { BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
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
