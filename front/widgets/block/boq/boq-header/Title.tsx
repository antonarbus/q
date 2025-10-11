import { useBlock } from '@entities/quotation/provider/BlockProvider'
import { getBoqHeaderHtmlFromStore } from '@entities/quotation/redux/getter/getBoqHeaderHtmlFromStore'
import { titleCellStyle } from '@entities/quotation/style/titleCellStyle'
import type { HeaderKey } from '@entities/quotation/type'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateTitleCell } from '@features/blocks/cell/update-cell'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import { type JSX, useRef } from 'react'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onContentChange={() => {
        updateTitleCell({
          blockIndex,
          boqHeaderKey,
          editorRef,
        })
      }}
      placeholder='Title...'
      style={titleCellStyle}
    />
  )
}
