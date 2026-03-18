import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { getBoqColumnHtmlFromStore } from '@entity/quotation/redux/getter/getBoqColumnHtmlFromStore'
import { columnHeaderStyle } from '@entity/quotation/style/columnHeaderStyle'
import { useRef } from 'react'
import { ResizableColumn } from '../ResizableColumn'
import { TextEditor } from '@shared/component/TextEditor'
import type { Editor } from '@tiptap/react'
import { onChangeTableHeaderCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-table-header-cell-at-boq-block/onChangeTableHeaderCellAtBoqBlock'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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
        registryKey={getRegistryKey({
          editorName: 'boqBlockDescriptionColumn',
          blockIndex: block.index,
          rowIndex: null,
        })}
        className='column-description'
        placeholder='Description...'
        contentGetter={() =>
          getBoqColumnHtmlFromStore({
            blockIndex: block.index,
            boqColumnKey: 'description',
          })
        }
        onUpdate={(params) => {
          onChangeTableHeaderCellAtBoqBlock({
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
