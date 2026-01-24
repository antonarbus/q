import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalTextCellStyle } from '@entity/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updateSubtotalText } from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { Editor } from '@tiptap/react'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    /*
    <Froala
      editorRef={editorRef}
      htmlGetter={() =>
        getBoqHeaderHtmlFromStore({ blockIndex: block.index, boqHeaderKey })
      }
      onContentChange={() => {
        updateSubtotalText({
          editorRef,
          blockIndex: block.index,
          boqHeaderKey,
        })
      }}
      placeholder='Subtotal...'
      style={subTotalTextCellStyle}
    />
    */
    <Tiptap
      editorRef={editorRef}
      content={getBoqHeaderHtmlFromStore({
        blockIndex: block.index,
        boqHeaderKey,
      })}
      onContentChange={(params) => {
        const html = params.editor.getHTML()
        console.log(html)
      }}
    />
  )
}
