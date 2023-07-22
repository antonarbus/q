import { Froala } from 'client/components/Froala'
import { saveBoqColumnNameItem } from 'client/features/items/itemsSlice'
import { store } from 'client/store'
import { RefDiv, RefAny } from 'client/types'
import { useRef } from 'react'

type Props = {
  index: number
}

export const BoqColumnNameItem = ({ index }: Props) => {
  const froalaElementRef = useRef() as RefDiv
  const editorRef = useRef(null) as RefAny
  const item = store.getState().items?.[index]

  if (item.type !== 'boq') return null
  const { html = 'Item' } = item.boq.column.item

  return (
    <Froala
      index={index}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      initHtml={html}
      placeholder='Item...'
      saveFroalaReducer={saveBoqColumnNameItem}
      additionalStyle={{
        textAlign: 'center',
      }}
    />
  )
}
