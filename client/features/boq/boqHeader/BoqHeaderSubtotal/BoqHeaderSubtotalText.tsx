import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalText } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { RefAny, RefDiv } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqHeaderSubtotalText = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Subtotal' } = item.boq.header.subtotal.text

  // todo: make this deletable on complete text removal, show a question in modal
  // todo: need to bring boolean flag into redux to make it work

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      saveFroalaReducer={saveBoqHeaderSubtotalText}
      additionalStyle={{
        height: '100%',
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right',
      }}
    />
  )
}
