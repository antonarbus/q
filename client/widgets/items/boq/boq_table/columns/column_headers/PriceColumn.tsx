import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/items/update_cell'
import { Froala, getBoqColumnHtmlFromStore, columnHeaderStyle, useItem, boqColumnKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types'
import { ResizableColumn } from '../ResizableColumn'

export const PriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Price...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey: boqColumnKey.price })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey: boqColumnKey.price })
        }}
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
