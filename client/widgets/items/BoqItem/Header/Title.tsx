import { itemBoqHeaderTitleHtmlGetter } from 'client/entities/items'
import { changeBoqHeaderTitle } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

interface Props {
  index: number
}

export const Title = ({ index }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[index]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Title...'
      initHtmlGetter={itemBoqHeaderTitleHtmlGetter}
      onContentChange={changeBoqHeaderTitle}
      additionalStyle={{
        flexGrow: 1,
      }}
    />
  )
}