import { itemBoqColumnNameDescriptionHtmlGetter } from 'client/entities/items'
import { changeBoqDescriptionColumnName } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const DescriptionColumnName = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Description...'
      initHtmlGetter={itemBoqColumnNameDescriptionHtmlGetter}
      onContentChange={changeBoqDescriptionColumnName}
      additionalStyle={{
        textAlign: 'left',
      }}
    />
  )
}
