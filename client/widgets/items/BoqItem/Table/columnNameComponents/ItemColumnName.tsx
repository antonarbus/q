import { itemBoqColumnNameItemHtmlGetter } from 'client/entities/items/model/itemBoqColumnNameItemHtmlGetter'
import { onBoqItemColumnNameChange } from 'client/features/on_boq_item_column_name_change'
import { store } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const ItemColumnName = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = store.getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Item...'
      initHtmlGetter={itemBoqColumnNameItemHtmlGetter}
      onContentChange={onBoqItemColumnNameChange}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
