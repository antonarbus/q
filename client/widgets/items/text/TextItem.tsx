import { useRef } from 'react'
import { ItemActions } from '@features/item_actions'
import { onTextItemResizeStart, onTextItemResizeStop } from '@features/resize_item'
import { updateTextItem } from '@features/update_cell'
import { Froala, Item, getItemTextHtmlFromStore, textItemCellStyle, useItem } from '@entities/items'
import { quotationSignal } from '@entities/quotation'
import { type FroalaEditor } from '@shared/types'

export const TextItem = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Item
      onItemResizeStart={onTextItemResizeStart}
      onItemResizeStop={onTextItemResizeStop}
      itemActions={<ItemActions />}
    >
      <Froala
        editorRef={editorRef}
        htmlGetter={() => getItemTextHtmlFromStore({ itemIndex })}
        placeholder='Add text, tables, drop images, files, links, select to format...'
        onContentChange={() => {
          updateTextItem({ editorRef, itemIndex })
        }}
        additionalStyle={textItemCellStyle}
        uploadParams={{
          id: quotationSignal.peek().id,
          email: quotationSignal.peek().email,
        }}
      />
    </Item>
  )
}
