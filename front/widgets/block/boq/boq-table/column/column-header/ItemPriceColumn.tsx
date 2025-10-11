import {
  boqColumnKey,
  columnHeaderStyle,
  columnMinWidth,
  Froala,
  getBoqColumnHtmlFromStore,
  useBlock,
} from '@entities/quotation'
import { updateBoqColumnCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.itemPrice}
      className={`th ${boqColumnKey.itemPrice} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.itemPrice}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex,
            boqColumnKey: boqColumnKey.itemPrice,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            editorRef,
            blockIndex,
            boqColumnKey: boqColumnKey.itemPrice,
          })
        }}
        placeholder='Item...'
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
