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

export const ItemPriceColumn = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  )

  return (
    <ResizableColumn
      boqColumnKey='itemPrice'
      className='th itemPrice resizable'
      minWidth={columnMinWidth.itemPrice}
    >
      <Tiptap
        editorRef={editorRef}
        className='column-item-price'
        placeholder='Item...'
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'itemPrice',
        })}
        onUpdate={(params) => {
          updateColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }}
        sx={columnHeaderStyle}
        isEditorActive={isEditorActive}
      />
    </ResizableColumn>
  )
}
