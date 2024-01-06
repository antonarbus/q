import { boqHeaderHtmlGetter, useItem } from 'client/entities/items'
import { updateBoqHeaderCell } from 'client/features/update_text'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'

const boqHeaderKey = 'title'

export const Title = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Title...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (editorRef.current === null) return
        const html = editorRef.current.html.get()
        updateBoqHeaderCell({ itemIndex, html, boqHeaderKey })
      }}
      additionalStyle={{
        flexGrow: 1,
        minHeight: '24px',
      }}
    />
  )
}
