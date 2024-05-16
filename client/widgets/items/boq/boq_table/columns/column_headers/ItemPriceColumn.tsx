import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/cell/update_cell'
import { Froala, getBoqColumnHtmlFromStore, columnHeaderStyle, useItem, boqColumnKey } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.itemPrice}
      className={`th ${boqColumnKey.itemPrice} resizable`}
      minWidth={100}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Item...'
        htmlGetter={() => getBoqColumnHtmlFromStore({ itemIndex, boqColumnKey: boqColumnKey.itemPrice })}
        onContentChange={() => {
          updateBoqColumnCell({ editorRef, itemIndex, boqColumnKey: boqColumnKey.itemPrice })
        }}
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
