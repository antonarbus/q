import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updateColumnCell } from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'

export const PriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='price'
      className='th price resizable'
      minWidth={columnMinWidth.price}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'price',
          })
        }
        onContentChange={() => {
          updateColumnCell({
            blockIndex: block.index,
            boqColumnKey: 'price',
            editorRef,
          })
        }}
        placeholder='Price...'
        style={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
