import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/items/update_cell'
import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle, boqColumnKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Qty...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey: boqColumnKey.qty })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey: boqColumnKey.qty })
        }}
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
