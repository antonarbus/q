import { type BoqEditorsRef, boqHeaderHtmlGetter } from 'client/entities/items'
import { changeBoqHeader } from 'client/features/change_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'

type Props = {
  itemIndex: number
  boqEditorsRef: BoqEditorsRef
}

const boqHeaderKey = 'price'

export const Price = ({
  itemIndex,
  boqEditorsRef,
}: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<FroalaEditor | null>(null)

  boqEditorsRef.current.subTotalEditorRef = editorRef
  console.log('🚀  boqEditorsRef:', boqEditorsRef)

  return (
    <Froala
      itemIndex={itemIndex}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      placeholder='Price...'
      htmlGetter={() => boqHeaderHtmlGetter({ itemIndex, boqHeaderKey })}
      onContentChange={() => {
        if (editorRef.current === null) return
        const html = editorRef.current.html.get()
        changeBoqHeader({ itemIndex, html, boqHeaderKey })
      }}
      additionalStyle={{
        width: '100%',
        minWidth: '100px',
        whiteSpace: 'nowrap',
        textAlign: 'right',
        flexShrink: 0,
        right: 0,
        minHeight: '24px',
      }}
    />
  )
}
