import { itemBoqColumnNameDescriptionHtmlGetter } from 'client/entities/items'
import { onBoqDescriptionColumnNameChange } from 'client/features/on_boq_description_column_name_change'
import { store } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const DescriptionColumnName = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = store.getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Description...'
      initHtmlGetter={itemBoqColumnNameDescriptionHtmlGetter}
      onContentChange={onBoqDescriptionColumnNameChange}
      additionalStyle={{
        textAlign: 'left',
      }}
    />
  )
}
