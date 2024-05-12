import { useRef } from 'react'
import { CopyItemIcon } from '@features/items/copy_item'
import { CutItemIcon } from '@features/items/cut_item'
import { DeleteItemIcon } from '@features/items/delete_item'
import { DragItemIcon } from '@features/items/drag_item'
import { OpenInfoItemModalIcon } from '@features/items/open_info_item_modal'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/items/resize_item'
import { SaveItemIcon } from '@features/items/save_item'
import { updateTextItem } from '@features/items/update_cell'
import { beforeUpload } from '@features/items/upload'
import { Froala, ItemComp, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/quotation'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { type FroalaEditor } from '@shared/types/froala'

export const TextItem = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ItemComp
      className='text-item'
      onItemResizeStart={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      leftItemActionButtons={(
        <ItemActionButtonsLayout>
          <DragItemIcon />
          <CopyItemIcon />
          <CutItemIcon />
        </ItemActionButtonsLayout>
      )}
      rightItemActionButtons={(
        <ItemActionButtonsLayout>
          <SaveItemIcon />
          <OpenInfoItemModalIcon />
          <DeleteItemIcon />
        </ItemActionButtonsLayout>
      )}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getItemTextHtmlFromStore({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        beforeUpload={beforeUpload}
        style={textItemCellStyle}
        onContentChange={() => {
          updateTextItem({ editorRef, itemIndex })
        }}
      />
    </ItemComp>
  )
}
