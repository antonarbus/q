import { boqHeaderHtmlGetter } from 'client/entities/items'
import { updateBoqHeaderCell } from 'client/features/update_text'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'subtotalText'

export const SubtotalText = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Subtotal...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (editorRef.current === null) return
        const html = editorRef.current.html.get()
        updateBoqHeaderCell({ itemIndex, html, boqHeaderKey })
      }}
      additionalStyle={{
        height: '100%',
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        minHeight: '24px',
      }}
    />
  )
}
