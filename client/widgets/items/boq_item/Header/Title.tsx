import { itemBoqHeaderTitleHtmlGetter } from 'client/entities/items'
import { changeBoqHeaderTitle } from 'client/features/change_text'
import { getState } from 'client/shared/clients'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'

type Props = {
  itemIndex: number
}

export const Title = ({ itemIndex }: Props): JSX.Element | null => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef(null)
  const item = getState().items[itemIndex]

  if (item?.type !== 'boq') return null

  return (
    <Froala
      itemIndex={itemIndex}
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
