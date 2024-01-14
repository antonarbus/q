import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle } from 'client/entities/items'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from 'client/shared/types'
import { updateBoqColumnCell } from 'client/features/update_cell'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey}
      className={`th ${boqColumnKey} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Qty...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey })
        }}
        additionalStyle={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
