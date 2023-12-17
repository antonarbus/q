import { boqHeaderHtmlGetter } from 'client/entities/items'
import { changeBoqHeader } from 'client/features/change_cell'
import { Froala } from 'client/shared/ui/froala'
import { useRef } from 'react'
import type FroalaEditor from 'froala-editor'
import { useBoqItemEditors } from '../BoqEditorsContext'
import { useItem } from '../../ItemProvider'

const boqHeaderKey = 'price'

export const Price = (): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)

  const boqItemEditors = useBoqItemEditors()
  const editorRef = useRef<FroalaEditor | null>(null)
  boqItemEditors.subTotalEditorRef = editorRef
  const { itemIndex } = useItem()

  return (
    <Froala
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
