import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/update_cell'
import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle, boqColumnKey } from '@entities/items'
import { type FroalaEditor } from '@shared/types'
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
        additionalStyle={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
