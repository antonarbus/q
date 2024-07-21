import { useRef } from 'react'
import { updateTitleCell } from '@features/blocks/cell/update_cell'
import {
  getBoqHeaderHtmlFromStore,
  useBlock,
  Froala,
  titleCellStyle,
  type BoqHeaderKey,
} from '@entities/quotation'
import type { FroalaEditor } from '@shared/types/froala'

const boqHeaderKey: BoqHeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { blockIndex } = useBlock()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Title...'
      htmlGetter={() => getBoqHeaderHtmlFromStore({ blockIndex, boqHeaderKey })}
      onContentChange={() => {
        updateTitleCell({ editorRef, blockIndex, boqHeaderKey })
      }}
      style={titleCellStyle}
    />
  )
}
