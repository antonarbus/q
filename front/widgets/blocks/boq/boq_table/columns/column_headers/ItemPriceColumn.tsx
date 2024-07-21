import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/blocks/cell/update_cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  columnHeaderStyle,
  useBlock,
  boqColumnKey,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

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
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
