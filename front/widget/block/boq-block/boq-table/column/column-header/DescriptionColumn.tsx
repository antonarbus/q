import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
// import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { updateColumnCell } from '@feature/blocks/update'
import { type ReactNode, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { Editor } from '@tiptap/react'

export const DescriptionColumn = (): ReactNode => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='description'
      className='th description resizable'
      minWidth={columnMinWidth.description}
    >
      {/* 
      <Froala
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
      /> 
      */}
      <Tiptap
        editorRef={editorRef}
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'description',
        })}
        onContentChange={(params) => {
          updateColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }}
      />
    </ResizableColumn>
  )
}
