import { Froala, getBoqColumnHtmlFromStore, columnHeaderStyle, useItem } from '@entities/items'
import { ResizableColumn } from '../ResizableColumn'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from '@shared/types'
import { updateBoqColumnCell } from '@features/update_cell'

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const ItemPriceColumn = (): JSX.Element => {
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
        placeholder='Item...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey })
        }}
        additionalStyle={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
