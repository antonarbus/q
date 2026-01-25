import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { updateColumnCell } from '@feature/blocks/update'
import { useSelector } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { Editor } from '@tiptap/react'

export const PriceColumn = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  )

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
        isEditorActive={isEditorActive}
      />
    </ResizableColumn>
  )
}
