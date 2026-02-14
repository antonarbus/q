import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { updateColumnCell } from '@feature/blocks/update'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
import type { Editor } from '@tiptap/react'

export const PriceColumn = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='price'
      className='th price resizable'
      minWidth={columnMinWidth.price}
    >
      <Tiptap
        editorRef={editorRef}
        className='column-price'
        placeholder='Price...'
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'price',
        })}
        onUpdate={(params) => {
          updateColumnCell({
            blockIndex: block.index,
            boqColumnKey: 'price',
            editorRef,
          })
        }}
        sx={columnHeaderStyle}
      />
    </ResizableColumn>
  )
}
