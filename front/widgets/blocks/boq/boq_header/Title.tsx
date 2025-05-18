import { useRef } from 'react'
import { updateTitleCell } from '@features/blocks/cell/update_cell'
import {
  getBoqHeaderHtmlFromStore,
  useBlock,
  Froala,
  titleCellStyle,
  type HeaderKey,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'

const boqHeaderKey: HeaderKey = 'title'

export const Title = (): React.JSX.Element => {
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
