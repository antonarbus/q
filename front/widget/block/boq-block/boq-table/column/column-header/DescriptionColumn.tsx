import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { updateColumnCell } from '@feature/blocks/update'
import { type ReactNode, useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { Tiptap } from '@shared/lib/tiptap/Tiptap'
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
      <Tiptap
        editorRef={editorRef}
        className='column-description'
        placeholder='Description...'
        content={getBoqColumnHtmlFromStore({
          blockIndex: block.index,
          boqColumnKey: 'description',
        })}
        onUpdate={(params) => {
          updateColumnCell({
            editorRef,
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }}
        sx={{
          ...columnHeaderStyle,
          textAlign: 'left',
        }}
      />
    </ResizableColumn>
  )
}
