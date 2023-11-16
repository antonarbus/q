import { boqHeaderHtmlGetter } from 'client/entities/items'
import { changeBoqHeader } from 'client/features/change_text'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
}

const boqHeaderKey = 'title'

export const Title = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  return (
    <Froala
      itemIndex={itemIndex}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Title...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (editorRef.current === null) return
        const html = editorRef.current.html.get()
        changeBoqHeader({ itemIndex, html, boqHeaderKey })
      }}
      additionalStyle={{
        flexGrow: 1,
      }}
    />
  )
}
