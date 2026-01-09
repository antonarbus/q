import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entity/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { titleCellStyle } from '@entity/quotation/style/titleCellStyle'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { Froala } from '@entity/quotation/ui/froala/Froala'
import { updateTitle } from '@feature/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() =>
        getBoqHeaderHtmlFromStore({ blockIndex: block.index, boqHeaderKey })
      }
      onContentChange={() => {
        updateTitle({
          blockIndex: block.index,
          boqHeaderKey,
          editorRef,
        })
      }}
      placeholder='Title...'
      style={titleCellStyle}
    />
  )
}
