import { boqHeaderHtmlGetter } from 'client/entities/items'
import { changeBoqHeader } from 'client/features/change_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { useItemIndex } from '../../ItemIndexProvider'

const boqHeaderKey = 'subtotal'

export const SubtotalText = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItemIndex()

  return (
    <Froala
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Subtotal...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (editorRef.current === null) return
        const html = editorRef.current.html.get()
        changeBoqHeader({ itemIndex, html, boqHeaderKey })
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
