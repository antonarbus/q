import { useRef } from 'react'
import { updateTextItem } from '@features/items/cell/update_cell'
import { CopyItemIcon } from '@features/items/copy'
import { CutItemIcon } from '@features/items/cut'
import { DeleteItemIcon } from '@features/items/delete'
import { DragItemIcon } from '@features/items/drag'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/items/resize'
import { BookmarkItemIcon } from '@features/open_close/open_bookmark_modal'
import { OpenInfoItemModalIcon } from '@features/open_close/open_item_info_modal'
import { beforeUpload } from '@features/upload'
import { Froala, ItemComp, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/quotation'
import { cls } from '@shared/consts/cls'
import { ItemActionButtonsLayout } from '@shared/layouts'
import { type FroalaEditor } from '@shared/types/froala'

export const TextItem = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <ItemComp
      className={cls.textItem}
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
          <BookmarkItemIcon />
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
