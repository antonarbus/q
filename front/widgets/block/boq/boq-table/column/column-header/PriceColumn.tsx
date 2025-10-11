import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entities/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateBoqColumnCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const PriceColumn = (): JSX.Element => {
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
