import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updateColumnCell } from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TiptapExample } from '@page/test-page/tiptap-example/TiptapExample'

export const ItemPriceColumn = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='itemPrice'
      className='th itemPrice resizable'
      minWidth={columnMinWidth.itemPrice}
    >
      {/* <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }
        onContentChange={() => {
          updateColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'itemPrice',
          })
        }}
        placeholder='Item...'
        style={columnHeaderStyle}
      /> */}

      <TiptapExample
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'itemPrice',
        })}
      />
    </ResizableColumn>
  )
}
