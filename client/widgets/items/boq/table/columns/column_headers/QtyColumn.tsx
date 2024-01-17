import type FroalaEditor from 'froala-editor'
import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/update_cell'
import { Froala, getBoqColumnHtmlFromStore, useItem, columnHeaderStyle } from '@entities/items'
import { type BoqColumnKey } from '@shared/types'
import { ResizableColumn } from '../ResizableColumn'

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
