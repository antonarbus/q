import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { titleCellStyle } from '@entity/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { updateTitle } from '@feature/blocks/update'
import { useRef } from 'react'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): React.JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <TextEditor
      editorRef={editorRef}
      className='title'
      placeholder='Title...'
      contentGetter={() =>
        getBoqHeaderHtmlFromStore({
          blockIndex: block.index,
          boqHeaderKey,
        })
      }
      onUpdate={(params) => {
        updateTitle({
          blockIndex: block.index,
          boqHeaderKey,
          editorRef,
        })
      }}
      sx={titleCellStyle}
    />
  )
}
