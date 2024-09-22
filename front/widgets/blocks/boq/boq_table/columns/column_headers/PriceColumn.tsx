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

export const PriceColumn = (): React.JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      minWidth={columnMinWidth.price}
      flexGrow={0}
    >
      <Froala
        editorRef={editorRef}
        placeholder='Price...'
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex,
            boqColumnKey: boqColumnKey.price,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            editorRef,
            blockIndex,
            boqColumnKey: boqColumnKey.price,
          })
        }}
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
