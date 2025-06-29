import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/blocks/cell/update_cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  useBlock,
  columnHeaderStyle,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/type/froala'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): React.JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.qty}
      className={`th ${boqColumnKey.qty} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.qty}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex,
            boqColumnKey: boqColumnKey.qty,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            blockIndex,
            boqColumnKey: boqColumnKey.qty,
            editorRef,
          })
        }}
        placeholder='Qty...'
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
