import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entities/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalTextCellStyle } from '@entities/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@root/shared/types/BlockItem'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateSubtotalText } from '@features/blocks/update'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const block = useBlock()

  return (
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
  )
}
