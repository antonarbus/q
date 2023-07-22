import { Froala } from 'client/components/Froala'
import { saveBoqHeaderTitle } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { TRefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqHeaderTitle = ({ index }: Props) => {
  const froalaElementRef = useRef() as TRefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html } = item.boq.header.title

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      saveFroalaReducer={saveBoqHeaderTitle}
      placeholder='Title...'
      additionalStyle={{ flexGrow: 1 }}
    />
  )
}
