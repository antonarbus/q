import { boqHeaderHtmlGetter } from 'client/entities/items'
import { updateBoqHeader } from 'client/features/update_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'subtotal'

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
        updateBoqHeader({ itemIndex, html, boqHeaderKey })
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
