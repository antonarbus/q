import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entities/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { subTotalTextCellStyle } from '@entities/quotation/style/subTotalTextCellStyle'
import type { HeaderKey } from '@entities/quotation/type'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateSubtotalTextCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onContentChange={() => {
        updateSubtotalTextCell({ editorRef, blockIndex, boqHeaderKey })
      }}
      placeholder='Subtotal...'
      style={subTotalTextCellStyle}
    />
  )
}
