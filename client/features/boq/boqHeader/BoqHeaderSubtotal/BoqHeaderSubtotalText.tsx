import { Froala } from 'client/components/Froala'
import { saveBoqHeaderSubtotalText } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefAny, TRefDiv } from 'client/types'
import { useRef } from 'react'

type TProps = {
  index: number
}

export const BoqHeaderSubtotalText = ({ index }: TProps) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef() as TRefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Subtotal', height } = item.boq.header.subtotal.text

  // todo: make this deletable on complete text removal, show a question in modal
  // todo: need to bring boolean flag into redux to make it work

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      height={height}
      saveFroalaReducer={saveBoqHeaderSubtotalText}
      additionalStyle={{
        height: '100%',
        width: '100%',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }}
    />
  )
}
