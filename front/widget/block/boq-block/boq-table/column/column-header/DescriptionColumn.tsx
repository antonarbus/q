import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { handleChangeOfColumnCell } from '@feature/blocks/handle-change-of-table-header-cell-at-boq-block/handleChangeOfColumnCell'

export const DescriptionColumn = (): React.ReactNode => {
  const editorRef = useRef<Editor | null>(null)
  const block = useBlock()

  return (
    <ResizableColumn
      boqColumnKey='description'
      className='th description resizable'
      minWidth={columnMinWidth.description}
    >
      <TextEditor
        registryKey={{
          blockIndex: block.index,
          editorName: 'descriptionColumn',
        }}
        className='column-description'
        placeholder='Description...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }
        onUpdate={(params) => {
          handleChangeOfColumnCell({
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
