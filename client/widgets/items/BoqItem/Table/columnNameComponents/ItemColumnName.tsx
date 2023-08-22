import { itemBoqColumnNameItemHtmlGetter } from 'client/entities/items'
import { changeBoqItemColumnName } from 'client/features/change_text'
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
      onContentChange={changeBoqItemColumnName}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
