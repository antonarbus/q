import { boqHeaderHtmlGetter } from 'client/entities/items'
import { changeBoqHeader } from 'client/features/change_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { useBoqItemEditors } from '../BoqEditorsContext'

type Props = {
  itemIndex: number
}

const boqHeaderKey = 'price'

export const Price = ({ itemIndex }: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)

  const boqItemEditors = useBoqItemEditors()
  const editorRef = useRef<FroalaEditor | null>(null)
  boqItemEditors.current.subTotalEditorRef = editorRef

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
