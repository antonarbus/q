import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateDescriptionCell } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useRow, useItem, Froala, useStylesForResizableCell, boqRowCellStyle } from '@entities/items'
import type { BoqColumnKey } from '@entities/items'

const boqColumnKey: BoqColumnKey = 'description'

export const DescriptionCell = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey, minWidth: '200px' })

  return (
      <Froala
        className={`td ${boqColumnKey}`}
        editorRef={editorRef}
        placeholder='Description...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          updateDescriptionCell({ editorRef, itemIndex, rowIndex, boqColumnKey })
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
