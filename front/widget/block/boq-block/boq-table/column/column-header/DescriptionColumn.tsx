import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updateColumnCell } from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type ReactNode, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TiptapExample } from '@page/test-page/tiptap-example/TiptapExample'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='description'
      className='th description resizable'
      minWidth={columnMinWidth.description}
    >
      {/* <Froala
        editorRef={editorRef}
        htmlGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }
        onContentChange={() => {
          updateColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }}
        placeholder='Description...'
        style={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      /> */}
      <TiptapExample
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'description',
        })}
      />
    </ResizableColumn>
  )
}
