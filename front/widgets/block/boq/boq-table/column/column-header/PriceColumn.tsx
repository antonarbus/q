import { useRef } from 'react'
import { updateBoqColumnCell } from '@features/blocks/cell/update-cell'
import {
  Froala,
  getBoqColumnHtmlFromStore,
  columnHeaderStyle,
  useBlock,
  boqColumnKey,
  columnMinWidth,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/type/froala'
import { ResizableColumn } from '../ResizableColumn'

export const PriceColumn = (): React.JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <ResizableColumn
      boqColumnKey={boqColumnKey.price}
      className={`th ${boqColumnKey.price} resizable`}
      flexGrow={0}
      minWidth={columnMinWidth.price}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex,
            boqColumnKey: boqColumnKey.price,
          })
        }
        onContentChange={() => {
          updateBoqColumnCell({
            blockIndex,
            boqColumnKey: boqColumnKey.price,
            editorRef,
          })
        }}
        placeholder='Price...'
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
