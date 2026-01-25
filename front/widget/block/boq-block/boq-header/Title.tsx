import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { titleCellStyle } from '@entity/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { updateTitle } from '@feature/blocks/update'
import { useSelector } from '@shared/lib/redux'
import { type JSX, useRef } from 'react'
import { Tiptap } from '@page/test-page/tiptap-example/Tiptap'
import type { Editor } from '@tiptap/react'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()
  const isEditorActive = useSelector(
    (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  )

  return (
    <Tiptap
      editorRef={editorRef}
      className='title'
      placeholder='Title...'
      content={getBoqHeaderHtmlFromStore({
        blockIndex: block.index,
        boqHeaderKey,
      })}
      onUpdate={(params) => {
        updateTitle({
          blockIndex: block.index,
          boqHeaderKey,
          editorRef,
        })
      }}
      sx={titleCellStyle}
      isEditorActive={isEditorActive}
    />
  )
}
