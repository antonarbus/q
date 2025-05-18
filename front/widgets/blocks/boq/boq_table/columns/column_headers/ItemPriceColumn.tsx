import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/blocks/cell/update_cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  columnHeaderStyle,
  useBlock,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'
import { ResizableColumn } from '../ResizableColumn'

export const ItemPriceColumn = (): React.JSX.Element => {
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
