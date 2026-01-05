import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entities/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entities/quotation/style/columnHeaderStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateColumnCell } from '@features/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const QtyColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='qty'
      className='th qty resizable'
      minWidth={columnMinWidth.qty}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'qty',
          })
        }
        onContentChange={() => {
          updateColumnCell({
            blockIndex: block.index,
            boqColumnKey: 'qty',
            editorRef,
          })
        }}
        placeholder='Qty...'
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
